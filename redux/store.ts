import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './Slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import LoadingReducer from './loadingButton';

const store = configureStore({
	reducer: {
		LoginReducer,
		SetLoading: LoadingReducer,
	}


});

export default store;

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector