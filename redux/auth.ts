import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firebase } from '../util/firebase';
import { Credential } from '../schemas/UserRegister/userRegister';
import { useAppDispatch } from './store';
import { set } from 'zod';

type initialStateType = { status: boolean | null, isLoading?: boolean }
const initialState: initialStateType = {status: null}

export const login = createAsyncThunk(
	'users/login',
	async (credentials: Credential) => {
		const res = await signInWithEmailAndPassword(getAuth(firebase), credentials.email, credentials.password)
		return true
	}
)

export const logout = createAsyncThunk(
	'users/logout',
	async () => {
		const res = await auth.signOut()
		return true
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
			state.isLoading = false
		})
		builder.addCase(login.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(login.rejected, (state, action) => {
			state.status = false
			state.isLoading = false
		})
		builder.addCase(logout.fulfilled, (state, action) => {
			state.status = false
		})
	}
});

const authReducer = Slice.reducer

export const { setLoginState } = Slice.actions;

export default authReducer;