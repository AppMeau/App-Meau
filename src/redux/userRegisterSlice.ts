import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, DocumentData, DocumentReference, getDoc, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { db, firebase } from '../util/firebase';
import { FirebaseError } from 'firebase/app';
import { animalRegisterType, animalSchema } from '../schemas/AnimalRegister/animalRegisterTypes';
import imageHandler from '../util/functions/ImageHandler';
import { User, userSchema } from '../schemas/UserRegister/userRegister';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';


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

export type registerProps = {
    name: string,
    age: string,
    email: string,
    state: string,
    city: string,
    address: string,
    phone: string,
    user: string,
    password: string,
    photoUrl: string | null,
}

export const registerUser = createAsyncThunk('user/register', async (props: registerProps, thunkAPI) => {
    try {
        const url = await imageHandler(
            "images/users/",
            props.photoUrl,
            props.name,
        );
        const docData = { ...props, photo: url ? url : "" }
        const auth = getAuth(firebase);
        const newUser = await createUserWithEmailAndPassword(
            auth,
            props.email,
            props.password,
        );
        if (newUser) {
            userSchema.parse({ ...docData, uid: newUser.user.uid, });
            await addDoc(collection(db, "users"), {
                ...docData,
                uid: newUser.user.uid,
            });
            return thunkAPI.fulfillWithValue({})
        }
    } catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.message })
	}
})

export const userRegisterSlice = createSlice({
	name: 'userRegisterSlice',
	initialState,
	reducers: {
		reducer: (state, action) => {
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.status = 'loading'
			state.isLoading = true
            state.error = null
		})
		builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.isLoading = false
            state.error = null
		})
		builder.addCase(registerUser.rejected, (state, action) => {
			state.status = 'failed'
			state.isLoading = false
            state.error = (action.payload as { error: FirebaseError })?.error
		})
	}
	});

const animalRegisterReducer = userRegisterSlice.reducer

export const { reducer } = userRegisterSlice.actions;

export default animalRegisterReducer;