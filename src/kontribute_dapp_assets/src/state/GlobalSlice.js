import { createSlice } from '@reduxjs/toolkit';

const GlobalSlice = createSlice({
    name: 'global',
    initialState: {
        quickview: false,
        currentMarketplace: process.env.MARKETPLACE_COLLECTION
    },
    reducers: {
        setQuickView: (state, action) => {
            state.quickview = action.payload;
        },
        setMarketplace: (state, action) => {
            state.currentMarketplace = action.payload;
        }
    }
})

export const { setQuickView, setMarketplace } = GlobalSlice.actions

export default GlobalSlice.reducer