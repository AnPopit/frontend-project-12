import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ids: [],
    entities: {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn(state, action) {
            const user  = action.payload;
            state.entities[user.id] = user;
            state.ids.push(user.id);
        },
        logOut(state, action) {
            const { id } = action.payload;
            delete state.entities[id];
            state.ids = state.ids.filter((idEl) => idEl !== id);
        },
    },
});


export const { logIn, logOut } = authSlice.actions;


export default authSlice.reducer;