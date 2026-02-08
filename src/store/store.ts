import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import appointmentReducer from './appointmentSlice';
import authReducer from './authSlice';
import serviceReducer from './serviceSlice';

export const store = configureStore({
    reducer: {
        services: serviceReducer,
        auth: authReducer,
        appointments: appointmentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();