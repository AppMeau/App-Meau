import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, DocumentData, DocumentReference, getDoc } from 'firebase/firestore';
import { db } from '../util/firebase';
import { FirebaseError } from 'firebase/app';
import { animalRegisterType } from '../schemas/AnimalRegister/animalRegisterTypes';

type SliceState = {state12: String}

// const initialState: SliceState = { state12: 'teste12'}

export type StateType = {
	animals: animalRegisterType[],
	status: string,
	error: FirebaseError | null
}

const initialState: StateType = {
  animals: [],
  status: 'idle',
  error: null
}

export const getAllAnimals = createAsyncThunk('animals/getAllAnimals', async (_, thunkAPI) => {
	try {
		const allAnimals = await getDoc(collection(db, "pets") as unknown as DocumentReference<DocumentData, DocumentData>)
		return allAnimals.data() as animalRegisterType[]
	} catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.message })
	}
})

export const Slice = createSlice({
	name: 'slice',
	initialState,
	reducers: {
		reducer: (state, action) => {
      
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllAnimals.pending, (state) => {
			state.status = 'loading'
		})
		builder.addCase(getAllAnimals.fulfilled, (state, action) => {
			console.log(action.payload)
			state.status = 'succeeded'
			state.animals = action.payload || []
		})
		builder.addCase(getAllAnimals.rejected, (state, action) => {
			state.status = 'failed'
			state.error = (action.payload as { error: FirebaseError }).error
		})
	}
	});

const LoginReducer = Slice.reducer

export const { reducer } = Slice.actions;

export default LoginReducer;