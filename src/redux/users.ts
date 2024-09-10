import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { db } from '../util/firebase';
import { FirebaseError } from 'firebase/app';
import { User, userSchema } from '../schemas/UserRegister/userRegister';

export type StateType = {
	users: User[],
	currentInterested: User | null,
	status: string,
	error: FirebaseError | null
}

const initialState: StateType = {
  users: [],
  currentInterested: null,
  status: 'idle',
  error: null
}

export async function getUserById(userId: string|number): Promise<User>{
	try{
		const snapshot = await getDocs(
			query(collection(db, "users"), where("uid", "==", userId))
		);
		const user = snapshot.docs.map(el => el.data())[0];
	  if(user){
		return userSchema.parse(user)
	  } else {
		throw new Error('user not found')
	  }
	} catch(e: any){
	  console.error(e)
	  throw new Error(e)
	}
  }

export const getAllInteresteds = async (interesteds: Array<{userId: string, isAlreadyInChat: boolean}>) => {
	try {
		let updatedInteresteds: User[] = []
		for (const interested of interesteds) {
			if (!interested.isAlreadyInChat) {
				const user = await getDocs(query(collection(db, "users"), where("uid", "==", interested.userId)))
				const userData = user.docs.map(doc => doc.data()) as User[]
				updatedInteresteds.push(userData[0])
			}
		}
		return updatedInteresteds
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getAllInterestedsPetAdoption = createAsyncThunk('users/getAllInterestedsPetAdoption', async (interesteds: Array<{userId: string, isAlreadyInChat: boolean}>, thunkAPI) => {
	try {
		let updatedInteresteds: User[] = []
		for (const interested of interesteds) {
		
				const user = await getDocs(query(collection(db, "users"), where("uid", "==", interested.userId)))
				const userData = user.docs.map(doc => doc.data()) as User[]
				updatedInteresteds.push(userData[0])
			
		}
		return updatedInteresteds
	} catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.message })
	}
})


export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setCurrentInterested: (state, action) => {
			state.currentInterested = action.payload
			console.log(action.payload)
		},
		clearCurrentInterested: (state) => {
			state.currentInterested = null
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAllInterestedsPetAdoption.pending, (state) => {
			state.status = 'loading'
		})
		builder.addCase(getAllInterestedsPetAdoption.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.users = action.payload
		})
		builder.addCase(getAllInterestedsPetAdoption.rejected, (state, action) => {
			state.status = 'failed'
			state.error = (action.payload as { error: FirebaseError }).error
		})
	}
	});

export const { setCurrentInterested, clearCurrentInterested } = userSlice.actions;
