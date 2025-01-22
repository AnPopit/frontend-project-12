import { createSlice } from '@reduxjs/toolkit';

const data = (JSON.parse(localStorage.getItem('user')));

console.log(data);

const initialState = { token: data?.token, username: data?.username, log: true };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, action) {
      const { token, username } = action.payload;
      // console.log(username)
      localStorage.setItem('user', JSON.stringify({ token, username }));
      state.log = true;
      state.token = token;
      // state.id = id;
      state.username = username;
    },
    logOut(state) {
      state.log = false;
      state.username = '';
      state.token = ''; // надо ли???
      // убрать из локал
      localStorage.clear();
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
