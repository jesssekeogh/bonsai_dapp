import { configureStore } from '@reduxjs/toolkit';
import Profile from './LoginSlice';

const store = configureStore({
    reducer: { Profile }
})

export default store;