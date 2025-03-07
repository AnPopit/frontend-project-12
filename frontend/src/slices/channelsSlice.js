/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { list: [], activeChannel: { id: '1' } };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.list = action.payload;
    },
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
    addChannel: (state, action) => {
      state.list.push(action.payload);
    },
    delChannel: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((el) => el.id !== id);
      state.activeChannel = { id: '1' };
    },
    updateChannel: (state, action) => {
      state.list = state.list.map((el) => {
        if (el.id === action.payload.id) {
          el.name = action.payload.name;
          return el;
        }
        return el;
      });
    },
  },
});

export const {
  setChannel, setActiveChannel, delChannel, updateChannel, addChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
