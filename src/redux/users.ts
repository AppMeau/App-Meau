import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { db } from '../util/firebase';
import { FirebaseError } from 'firebase/app';
import { User } from '../schemas/UserRegister/userRegister';

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


export async function getUserById(userId: string|number){
	try{
		const snapshot = await getDocs(
			query(collection(db, "users"), where("uid", "==", userId))
		);
		const user = snapshot.docs.map(el => el.data())[0];
	  if(user){
		return user
	  } else {
		throw new Error('user not found')
	  }
	} catch(e){
	  console.error(e)
	}
  }

export const getAllInteresteds = async (usersId: Array<string>) => {
	try {
		let interesteds: User[] = []
		for (const userId of usersId) {
			const user = await getDocs(query(collection(db, "users"), where("uid", "==", userId)))
			const userData = user.docs.map(doc => doc.data()) as User[]
			interesteds.push(userData[0])
		}
		return interesteds
	} catch (error: any) {
		throw new Error(error)
	}
}


export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		reducer: (state, action) => {
		},
	},
	extraReducers: (builder) => {
	}
	});

export const { reducer } = userSlice.actions;