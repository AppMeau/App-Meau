import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '../util/firebase';
import { Credential } from '../schemas/UserRegister/userRegister';
import { Redirect, router } from 'expo-router';
import { useAppDispatch } from './store';
import { set } from 'zod';

type initialStateType = { status: boolean | null }
const initialState: initialStateType = {status: null}

export const login = createAsyncThunk(
	'users/login',
	async (credentials: Credential) => {
		console.log("chamou login")
		const res = await signInWithEmailAndPassword(getAuth(firebase), credentials.email, credentials.password)
		return res
	}
)

export const checkAuthStatus = createAsyncThunk(
	'users/checkAuthStatus',
	async (_, {dispatch}) => {
		const auth = getAuth(firebase)
		const user = auth.currentUser
		if (user) {
			dispatch(setLoginState(true))
		} else {
			dispatch(setLoginState(false))
		}
	}
)

export const Slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoginState: (state, action) => {
			state.status = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.status = true
		})
		builder.addCase(login.rejected, (state, action) => {
			state.status = false
		})
	}
});

const authReducer = Slice.reducer

export const { setLoginState } = Slice.actions;

export default authReducer;