import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, DocumentData, DocumentReference, getDoc, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { db } from '../util/firebase';
import { FirebaseError } from 'firebase/app';
import { animalRegisterType, animalSchema } from '../schemas/AnimalRegister/animalRegisterTypes';

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

const parsePet = (pet: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
	try {
		const parse = animalSchema.parse({id: pet.id, ...pet.data()})
		return parse
	} catch (error: any | undefined) {
		throw new Error('Error parsing data', error)
	}
}

export const getAllAnimals = createAsyncThunk('animals/getAllAnimals', async (_, thunkAPI) => {
	try {
		const allAnimals = await getDocs(collection(db, "pets"))
		const allAnimalsData = allAnimals.docs.map(parsePet)
		return allAnimalsData as animalRegisterType[]
	} catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.message })
	}
})

export const getUserPets = createAsyncThunk('animals/getUserPets', async (userId: string, thunkAPI) => {
	try {
		const pets = await getDocs(query(collection(db, "pets"), where("userId", "==", userId)))
		const allAnimalsData = pets.docs.map(parsePet)
		return allAnimalsData as animalRegisterType[]
	} catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.message })
	}
})

export const getAvailablePets = createAsyncThunk('animals/getAvailablePets', async (_, thunkAPI) => {
	try {
		const pets = await getDocs(query(collection(db, "pets"), where("availableToAdoption", "==", true)))
		const allAnimalsData = pets.docs.map(parsePet)
		return allAnimalsData as animalRegisterType[]
	} catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.message })
	}
})

export const animalSlice = createSlice({
	name: 'animalSlice',
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
			state.status = 'succeeded'
			state.animals = action.payload
		})
		builder.addCase(getAllAnimals.rejected, (state, action) => {
			state.status = 'failed'
			state.error = (action.payload as { error: FirebaseError }).error
		})
		builder.addCase(getUserPets.pending, (state) => {
			state.status = 'loading'
		})
		builder.addCase(getUserPets.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.animals = action.payload
		})
		builder.addCase(getUserPets.rejected, (state, action) => {
			state.status = 'failed'
			state.error = (action.payload as { error: FirebaseError }).error
		})
		builder.addCase(getAvailablePets.pending, (state) => {
			state.status = 'loading'
		})
		builder.addCase(getAvailablePets.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.animals = action.payload
		})
		builder.addCase(getAvailablePets.rejected, (state, action) => {
			state.status = 'failed'
			state.error = (action.payload as { error: FirebaseError }).error
		})
	}
	});

const LoginReducer = animalSlice.reducer

export const { reducer } = animalSlice.actions;

export default LoginReducer;