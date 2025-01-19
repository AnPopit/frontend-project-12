import { createSlice } from '@reduxjs/toolkit';

const initialState = {token: '', id: '', log: false};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn(state, action) {
            const {token, id, username}  = action.payload;

            localStorage.setItem('user', JSON.stringify({token, id}));
            state.log = true;
            state.token = token;
            state.id = id;
            state.username = username;

        },
        logOut(state, action) {
            state.log = false;
            state.token = false; //надо ли???
        },
    },
});


export const { logIn, logOut } = authSlice.actions;


export default authSlice.reducer;