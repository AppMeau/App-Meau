import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../util/firebase";
import { FirebaseError } from "firebase/app";
import {
  PetRegisterType,
  PetSchema,
} from "../schemas/PetRegister/petRegisterTypes";
import { sendMessageNotification } from "./notification";
import { getUserById } from "./users";

export type StateType = {
  pets: PetRegisterType[];
  status: string;
  error: FirebaseError | null;
};

const initialState: StateType = {
  pets: [],
  status: "idle",
  error: null,
};

const parsePet = (pet: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
  try {
    const parse = PetSchema.parse({ id: pet.id, ...pet.data() });
    return parse;
  } catch (error: any | undefined) {
    throw new Error("Error parsing data", error);
  }
};

export const getAllpets = createAsyncThunk(
  "pets/getAllpets",
  async (_, thunkAPI) => {
    try {
      const allpets = await getDocs(collection(db, "pets"));
      const allpetsData = allpets.docs.map(parsePet);
      return allpetsData as PetRegisterType[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserPets = createAsyncThunk(
  "pets/getUserPets",
  async (userId: string, thunkAPI) => {
    try {
      const pets = await getDocs(
        query(collection(db, "pets"), where("userId", "==", userId))
      );
      const allpetsData = pets.docs.map(parsePet);
      return allpetsData as PetRegisterType[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addInterested = createAsyncThunk("pets/addInterested", 
  async (params: {pet: PetRegisterType, userId: string}, thunkAPI) => {
    try {
      if(params.pet.userId){
        const owner = await getUserById(params.pet.userId)
        console.log()
        if(owner?.notification_token){
          await updateDoc(doc(collection(db, "pets"), params.pet.id), {interesteds: [...params.pet.interesteds || [], params.userId]})
          await sendMessageNotification(owner.notification_token, `Um usuário se interessou pelo seu pet ${params.pet.name}`)
        }
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const removeInterested = createAsyncThunk("pets/removeInterested", 
  async (params: {pet: PetRegisterType, userId: string}, thunkAPI) => {
    try {
      const interestedsUpdated = params.pet.interesteds!.filter((interested) => interested !== params.userId)
      await updateDoc(doc(collection(db, "pets"), params.pet.id), {interesteds: interestedsUpdated})
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  });

export const getAvailablePets = createAsyncThunk(
  "pets/getAvailablePets",
  async (_, thunkAPI) => {
    try {
      const pets = await getDocs(
        query(collection(db, "pets"), where("availableToAdoption", "==", true))
      );
      const allpetsData = pets.docs.map(parsePet);
      return allpetsData as PetRegisterType[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const petSlice = createSlice({
  name: "petSlice",
  initialState,
  reducers: {
    reducer: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllpets.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllpets.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.pets = action.payload;
    });
    builder.addCase(getAllpets.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as { error: FirebaseError }).error;
    });
    builder.addCase(getUserPets.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserPets.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.pets = action.payload;
    });
    builder.addCase(getUserPets.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as { error: FirebaseError }).error;
    });
    builder.addCase(getAvailablePets.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAvailablePets.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.pets = action.payload;
    });
    builder.addCase(getAvailablePets.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as { error: FirebaseError }).error;
    });
  },
});

const PetReducer = petSlice.reducer;

export const { reducer } = petSlice.actions;

export default PetReducer;
