import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, DocumentData, DocumentReference, getDoc, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { db } from '../util/firebase';
import { FirebaseError } from 'firebase/app';
import { User } from '../schemas/UserRegister/userRegister';

type SliceState = {state12: String}

// const initialState: SliceState = { state12: 'teste12'}

export type StateType = {
	users: User[],
	status: string,
	error: FirebaseError | null
}

const initialState: StateType = {
  users: [],
  status: 'idle',
  error: null
}

export const getAllInteresteds = createAsyncThunk('users/getAllInteresteds', async (usersId: Array<string>, thunkAPI) => {
	try {
		let interesteds: User[] = []
		for (const userId of usersId) {
			const user = await getDocs(query(collection(db, "users"), where("uid", "==", userId)))
			const userData = user.docs.map(doc => doc.data()) as User[]
			interesteds.push(userData[0])
		}
		return interesteds
	} catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.message })
	}
})


export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		reducer: (state, action) => {
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllInteresteds.pending, (state) => {
			state.status = 'loading'
		})
		builder.addCase(getAllInteresteds.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.users = action.payload
		})
		builder.addCase(getAllInteresteds.rejected, (state, action) => {
			state.status = 'failed'
			state.error = (action.payload as { error: FirebaseError }).error
		})
	}
	});

export const { reducer } = userSlice.actions;