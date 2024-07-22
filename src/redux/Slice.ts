import { createSlice } from '@reduxjs/toolkit';

type SliceState = {state12: String}

const initialState: SliceState = { state12: 'teste12'}

export const Slice = createSlice({
	name: 'slice',
	initialState,
	reducers: {
		reducer: (state, action) => {
            
		},
	},
});

const LoginReducer = Slice.reducer

export const { reducer } = Slice.actions;

export default LoginReducer;