import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn(state, action) {
            const user  = action.payload;
            localStorage.setItem('user', JSON.stringify(user));
            //флаг авторизирован ли 
            state[user.id] = user;

        },
        logOut(state, action) {
            const { id } = action.payload;
            delete state[id];
        },
    },
});


export const { logIn, logOut } = authSlice.actions;


export default authSlice.reducer;