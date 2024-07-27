import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../util/firebase";
import { FirebaseError } from "firebase/app";
import {
  petRegisterType,
  petSchema,
} from "../schemas/PetRegister/petRegisterTypes";

type SliceState = { state12: String };

// const initialState: SliceState = { state12: 'teste12'}

export type StateType = {
  pets: petRegisterType[];
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
    const parse = petSchema.parse({ id: pet.id, ...pet.data() });
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
      return allpetsData as petRegisterType[];
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
      return allpetsData as petRegisterType[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getAvailablePets = createAsyncThunk(
  "pets/getAvailablePets",
  async (_, thunkAPI) => {
    try {
      const pets = await getDocs(
        query(collection(db, "pets"), where("availableToAdoption", "==", true))
      );
      const allpetsData = pets.docs.map(parsePet);
      return allpetsData as petRegisterType[];
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

const LoginReducer = petSlice.reducer;

export const { reducer } = petSlice.actions;

export default LoginReducer;
