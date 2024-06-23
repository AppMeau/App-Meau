import { createSlice } from '@reduxjs/toolkit';

export const Slice = createSlice({
	name: 'slice',
	initialState: {
        state1: "",
    },
	reducers: {
		reducer: (state, action) => {
            
		},
	},
});

const LoginReducer = Slice.reducer

export const { reducer } = Slice.actions;

export default LoginReducer;