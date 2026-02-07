import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import serviceReducer from './serviceSlice';

export const store = configureStore({
    reducer: {
        services: serviceReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;