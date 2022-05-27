import { configureStore } from '@reduxjs/toolkit';
import Profile from './LoginSlice';
import Global from './GlobalSlice';

const store = configureStore({
    reducer: { Profile, Global }
})

export default store;