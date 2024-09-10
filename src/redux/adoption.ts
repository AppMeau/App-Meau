import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db, firebase, storage } from "../util/firebase";
import {adoptionPet, adoptionSchema, adoptionUser, type adoption} from '../schemas/Adoption/schema'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useAppDispatch } from "./store";
import { notifications, sendNotification } from "./notification";
import { changeOwnership, clearInteresteds } from "./pets";
import { closeRoom } from "./chat";
import { addPetToAdoptedPets, getUserById } from "./users";

type initialStateType = {
  isLoading?: boolean;
  adoptions: adoption[];
};
const initialState: initialStateType = { adoptions: [], isLoading: false };
const cancelAllAdoptions = async (petId: string) => {
  const adoptionsRef = collection(db, "adoptions");
  const adoptionsSnapshot = await getDocs(query(adoptionsRef, where("pet.id", "==", petId), where("status", "==", "pending")));
  adoptionsSnapshot.docs.forEach(async (doc) => {
    await updateDoc(doc.ref, {status: "rejected"});
  });
}

export const createAdoption = createAsyncThunk("adoption/createAdoption", async ({pet, currentOwner, adopter}: {pet: adoptionPet, currentOwner: adoptionUser, adopter: adoptionUser}) => {
  try{
    const {notification_token} = await getUserById(adopter.uid)
    const adoption = {
      pet: pet,
      currentOwner: currentOwner,
      adopter: adopter,
      status: "pending",
    }
    const res = await addDoc(collection(db, "adoptions"), adoption);
    await sendNotification(notifications.adoptionSolicitation(notification_token!, pet.name, currentOwner.name));
    return adoptionSchema.parse({id: res.id, ...adoption});
  } catch (e){
    console.error(e);
  }
})

export const respondAdoption = createAsyncThunk("adoption/respondAdoption", async ({adoption, status}: {adoption: adoption, status: "accepted"|"rejected"}) => {
  const {pet, currentOwner, adopter} = adoption;
  try{
    const {notification_token: adopter_notification_token} = await getUserById(adopter.uid)
    const {notification_token: owner_notification_token} = await getUserById(currentOwner.uid)
    const adoptionRef = doc(db, "adoptions", adoption.id);
    await updateDoc(adoptionRef, {status: status});
    if(status==="accepted"){
      await cancelAllAdoptions(pet.id)
      await sendNotification(notifications.adopted(adopter_notification_token!, pet.name, pet.id));
      await sendNotification(notifications.adoptionAccepted(owner_notification_token!, pet.name, adopter.name));
      await changeOwnership({petId: pet.id, ownerId:adopter.uid});
      await addPetToAdoptedPets(pet.id, adopter.uid);
      await clearInteresteds(pet.id);
      await closeRoom(pet.id)
    }
    else
      await sendNotification(notifications.adoptionRejected(owner_notification_token!, adoption.pet.name, adopter.name));
    return adoption.id;
  } catch (e){
    console.error(e);
  }
});

export const getUserPendingAdoptions = createAsyncThunk("adoption/getUserPendingAdoptions", async (userId: string) => {
  try{
    const adoptionsRef = collection(db, "adoptions");
    const adoptionSnapshot = await getDocs( query(adoptionsRef, where("adopter.uid", "==", userId), where("status", "==", "pending")));
    return adoptionSnapshot.docs.map((doc) => {
      return adoptionSchema.parse({id: doc.id, ...doc.data()})
    });
  } catch (e){
    console.error(e);
    return [];
  }
});

export const Slice = createSlice({
  name: "adoption",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(respondAdoption.fulfilled, (state, action) => {
      state.adoptions = state.adoptions.filter(adoption => adoption.id !== action.payload);
    });
    builder.addCase(respondAdoption.rejected, () => {
        console.log("failed to send adoption response")
    });
    builder.addCase(getUserPendingAdoptions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adoptions = action.payload;
    });
    builder.addCase(getUserPendingAdoptions.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserPendingAdoptions.pending, (state) => {
      state.isLoading = true;
    });
  },
});

const adoptionsReducer = Slice.reducer;

export const {} = Slice.actions;

export default adoptionsReducer;
