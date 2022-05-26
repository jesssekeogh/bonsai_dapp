import { createSlice } from '@reduxjs/toolkit';

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        principal: ""
    },
    reducers: {
        setLogin: state => {
            state.loggedIn = true;
        },
        setLogout: state => {
            state.loggedIn = false;
        },
        setPrincipal: (state, action) => {
            state.principal = action.payload
        }
    }
})

export const { setLogin, setLogout, setPrincipal } = LoginSlice.actions

export default LoginSlice.reducer