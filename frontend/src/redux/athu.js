import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        totalCart: 0,
        mes: '',
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        alert: (state, action) => {
            state.mes = action.payload;
        },

        clearAlert: (state) => {
            state.mes = '';
        },
        
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },

        cart: (state, action) => {
            state.totalCart = action.payload;
        },
    },
});

export const { login, logout, cart, alert, clearAlert } = authSlice.actions;
export default authSlice.reducer;
