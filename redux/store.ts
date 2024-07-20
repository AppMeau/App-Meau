import { configureStore } from '@reduxjs/toolkit';
import LoginReducer, { Slice } from './Slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
	// reducer: LoginReducer,
	reducer: {
		animals: Slice.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector