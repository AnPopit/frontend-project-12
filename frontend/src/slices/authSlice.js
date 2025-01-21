import { createSlice } from '@reduxjs/toolkit';

const {token, username} = (JSON.parse(localStorage.getItem('user')))


const initialState = {token: token, username: username ,log: true};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn(state, action) {
            const {token, username}  = action.payload;
            //console.log(username)
            localStorage.setItem('user', JSON.stringify({token, username}));
            state.log = true;
            state.token = token;
            //state.id = id;
            state.username = username;

        },
        logOut(state, action) {
            state.log = false;
            state.username = ''
            state.token = '' //надо ли???
        },
    },
});


export const { logIn, logOut } = authSlice.actions;


export default authSlice.reducer;