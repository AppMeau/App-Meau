import { createSlice } from "@reduxjs/toolkit";

const initialState= false
export const loading = createSlice({
  name: 'loading',
  initialState: { value: initialState},
  reducers: {
    SetLoading: (state, action)=>{
      state.value=action.payload
    }
  }
})
// Export the reducer function
const LoadingReducer = loading.reducer
export const { SetLoading } = loading.actions
export default LoadingReducer
