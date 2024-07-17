import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './Slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
	reducer: LoginReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector