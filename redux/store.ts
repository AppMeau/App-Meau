import { configureStore } from '@reduxjs/toolkit';
import LoginReducer, { animalSlice } from './Slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
	// reducer: LoginReducer,
	reducer: {
		animals: animalSlice.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector