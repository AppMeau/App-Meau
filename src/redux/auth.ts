import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, firebase, storage } from '../util/firebase';
import { Credential, User, userSchema } from '../schemas/UserRegister/userRegister';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';

type initialStateType = { status: boolean | null, isLoading?: boolean, user: User | null}
const initialState: initialStateType = {status: null, user: null}

export const login = createAsyncThunk(
	'users/login',
	async (credentials: Credential) => {
		const res = await signInWithEmailAndPassword(getAuth(firebase), credentials.email, credentials.password)
		
		const users = await getDocs(query(collection(db,'users'), where('uid', '==', res.user.uid)))
		const usersData = users.docs.map(doc => doc.data())
		if(usersData.length){
			return usersData[0]
		}
		return null
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
			dispatch(setUser(null))
			dispatch(setLoginState(false))
		}
	}
)

export const selectUser = (state: any) => state.auth.user

export const Slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoginState: (state, action) => {
			state.status = action.payload
		},
		setUser: (state, action) => {
			state.user = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.status = true
			state.isLoading = false
			state.user = userSchema.parse(action.payload)
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
			state.user = null
		})
	}
});

const authReducer = Slice.reducer

export const { setLoginState, setUser } = Slice.actions;

export default authReducer;