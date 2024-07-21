import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, DocumentData, DocumentReference, getDoc, getDocs, query } from 'firebase/firestore';
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

export const getAllAnimals = createAsyncThunk('animals/getAllAnimals', async (_, thunkAPI) => {
	try {
		const allAnimals = await getDocs(collection(db, "pets"))
		const allAnimalsData = allAnimals.docs.map(doc => {
			try {
				const parse = animalSchema.parse({id: doc.id, ...doc.data()})
				// console.log('PARSE', parse)
				return parse
			} catch (error: any | undefined) {
				throw new Error('Error parsing data', error)
			}
		})
		console.log('ALL ANIMALS', allAnimalsData)
		return allAnimalsData as animalRegisterType[]
	} catch (error: any) {
		// console.error('Error fetching data', error)
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
			console.log('PAYLOAD', action.payload)
			state.status = 'succeeded'
			state.animals = action.payload
		})
		builder.addCase(getAllAnimals.rejected, (state, action) => {
			state.status = 'failed'
			state.error = (action.payload as { error: FirebaseError }).error
		})
	}
	});

const LoginReducer = animalSlice.reducer

export const { reducer } = animalSlice.actions;

export default LoginReducer;