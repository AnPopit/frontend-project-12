/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
  try {
      return JSON.parse(localStorage.getItem('user') || '');
  } catch (error) {
      return null;
  }
};

const data = getUserFromLocalStorage();

console.log(data);

const initialState = { token: data?.token, username: data?.username, log: true };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, action) {
      const { token, username } = action.payload;
      console.log(token);
      localStorage.setItem('user', JSON.stringify({ token, username }));
      state.log = true;
      state.token = token;
      state.username = username;
    },
    logOut(state) {
      state.log = false;
      state.username = '';
      state.token = '';
      localStorage.setItem('user', null);
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
