import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, DocumentData, DocumentReference, getDoc, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { db } from '../util/firebase';
import { FirebaseError } from 'firebase/app';
import { animalRegisterType, animalSchema } from '../schemas/AnimalRegister/animalRegisterTypes';
import imageHandler from '../util/functions/ImageHandler';
import { User } from '../schemas/UserRegister/userRegister';


export type StateType = {
	status: string,
	error: FirebaseError | null
	isLoading: boolean
}

const initialState: StateType = {
  status: 'idle',
  error: null,
  isLoading: false
}

export type animalRegisterProps = {
	photoUrl: string | null;
	name: string;
    species: string,
    gender: string,
    size: string,
    age: string,
    playfull: boolean,
    shy: boolean,
    calm: boolean,
    guard: boolean,
    lovely: boolean,
    lazy: boolean,
    vaccinated: boolean,
    dewormed: boolean,
    castrated: boolean,
    sick: boolean,
    sickness: string,
    adoptionTerm: boolean,
    homePhotos: boolean,
    previousVisit: boolean,
    acompanyBeforeAdoption: boolean,
    periodToAcompany: string,
    about: string,
    disable: boolean,
	ownerId: User
}




export const registerAnimal = createAsyncThunk('animals/register', async (props: animalRegisterProps, thunkAPI) => {
	try {
		const url = await imageHandler(
			"images/pets/",
			props.photoUrl,
			props.name,
		);
		const docData = { ...props, photo: url, availableToAdoption: true }
		animalSchema.parse(docData);
		await addDoc(collection(db, "pets"), docData);
		return thunkAPI.fulfillWithValue({})
	} catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.message })
	}
})

export const animalRegisterSlice = createSlice({
	name: 'animalRegisterSlice',
	initialState,
	reducers: {
		reducer: (state, action) => {
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerAnimal.pending, (state) => {
			state.status = 'loading'
			state.isLoading = true;
			state.error = null
		})
		builder.addCase(registerAnimal.fulfilled, (state, action) => {
			state.status = "succeeded"
			state.isLoading = false
			state.error = null
		})
		builder.addCase(registerAnimal.rejected, (state, action) => {
			state.status = 'failed'
			state.isLoading = false
			state.error = (action.payload as { error: FirebaseError }).error
		})
	}
	});

const animalRegisterReducer = animalRegisterSlice.reducer

export const { reducer } = animalRegisterSlice.actions;

export default animalRegisterReducer;