import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import chatReducer from './slices/chatSlice'
import messageReducer from './slices/messageSlice'
import instructorReducer from './slices/instructorSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
        chat:chatReducer,
        message:messageReducer,
        instructor: instructorReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store