import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const initialState = {}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state[action.payload.id] = action.payload
        },
    },
   
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;