import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db, firebase, storage } from "../util/firebase";
import {adoptionPet, adoptionSchema, adoptionUser, type adoption} from '../schemas/Adoption/schema'
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useAppDispatch } from "./store";
import { notifications, sendNotification } from "./notification";

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
    const adoptionRef = doc(collection(db, "adoptions"));
    const adoption = {
      pet: pet,
      currentOwner: currentOwner,
      adopter: adopter,
      status: "pending",
    }
    await updateDoc(adoptionRef, adoption);
    await sendNotification(notifications.adoptionSolicitation(adopter.notifyToken, pet.name, currentOwner.name));
    return adoptionSchema.parse({id: adoptionRef.id, ...adoption});
  } catch (e){
    console.error(e);
  }
})

export const respondAdoption = createAsyncThunk("adoption/respondAdoption", async ({adoption, status}: {adoption: adoption, status: "accepted"|"rejected"}) => {
  try{
    const adoptionRef = doc(db, "adoptions", adoption.id);
    await updateDoc(adoptionRef, {status: status});
    if(status==="accepted"){
      await cancelAllAdoptions(adoption.pet.id)
      await sendNotification(notifications.adopted(adoption.adopter.notifyToken, adoption.pet.name, adoption.pet.id));
      await sendNotification(notifications.adoptionAccepted(adoption.currentOwner.notifyToken, adoption.pet.name, adoption.adopter.name));
    }
    else
      await sendNotification(notifications.adoptionRejected(adoption.currentOwner.notifyToken, adoption.pet.name, adoption.adopter.name));
    return adoption.id;
  } catch (e){
    console.error(e);
  }
});

export const getUserPendingAdoptions = createAsyncThunk("adoption/getUserPendingAdoptions", async (userId: string) => {
  try{
    const adoptionsRef = collection(db, "adoptions");
    const adoptionSnapshot = await getDocs( query(adoptionsRef, where("adopter.id", "==", userId), where("status", "==", "pending")));
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
