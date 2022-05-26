import { configureStore } from '@reduxjs/toolkit';
import Profile from './LoginSlice';

export const store = configureStore({
    reducer: { Profile }
})