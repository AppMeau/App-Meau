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
import { sendInterestedNotification, sendMessageNotification } from "./notification";
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
        query(collection(db, "pets"), where("ownerId", "==", userId))
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
      if(params.pet.ownerId){
        const owner = await getUserById(params.pet.ownerId)
        if(owner?.notification_token){
          await updateDoc(doc(collection(db, "pets"), params.pet.id), {interesteds: [...params.pet.interesteds, {userId: params.userId, isAlreadyInChat: false}]})
          await sendInterestedNotification(owner.notification_token, params.pet.name)
        }
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const removeInterested = createAsyncThunk("pets/removeInterested", 
  async (params: {pet: PetRegisterType, userId: string}, thunkAPI) => {
    try {
      let interestedsUpdated = params.pet.interesteds.map((interested: {userId: string, isAlreadyInChat: boolean}) => interested.userId === params.userId ? {userId: interested.userId, isAlreadyInChat: true} : interested)
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

export const getUserPetsWithInteresteds = createAsyncThunk(
  "pets/getPetsWithInteresteds",
  async (userId: string, thunkAPI) => {
    try {
      const pets = await getDocs(
        query(
          collection(db, "pets"),
          where("ownerId", "==", userId),
          where("interesteds", "!=", []),
          where("availableToAdoption", "==", true))
      );
      const allpetsData = pets.docs.map(parsePet);
      return allpetsData as PetRegisterType[];
    } catch (error: any) {
      console.log(error)
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const setUnavailableToAdoption = createAsyncThunk("pets/setUnavailableToAdoption", 
  async (petId: string, thunkAPI) => {
    try {
      await updateDoc(doc(collection(db, "pets"), petId), {availableToAdoption: false})     
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
});

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
    builder.addCase(getUserPetsWithInteresteds.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserPetsWithInteresteds.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.pets = action.payload;
    });
    builder.addCase(getUserPetsWithInteresteds.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as { error: FirebaseError }).error;
    });
    // builder.addCase(setUnavailableToAdoption.pending, (state) => {
    //   state.status = "loading";
    // });
    // builder.addCase(setUnavailableToAdoption.fulfilled, (state, action) => {
    //   state.status = "insert succeeded";
    // });
    // builder.addCase(setUnavailableToAdoption.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = (action.payload as { error: FirebaseError }).error;
    // });
  },
});

const PetReducer = petSlice.reducer;

export const { reducer } = petSlice.actions;

export default PetReducer;
