import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../util/firebase';
import { UserCredentials } from '../schemas/UserRegister/userRegister';
import { router } from "expo-router";

type SliceState = {state12: String}

const initialState: SliceState = { state12: 'teste12'}

export const login = createAsyncThunk(
	'user/login',
	async (credentials: UserCredentials) => {
		const res = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
		router.navigate("/")
		return res
	}
)

export const authSlice = createSlice({
	name: 'slice',
	initialState,
	reducers: {
		reducer: (state, action) => {
            
		},
	},
});

const authReducer = authSlice.reducer

export const { reducer } = authSlice.actions;

export default authReducer;