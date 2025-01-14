import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';


export const addDataMessages = createAsyncThunk(
    'messages/addDataMessages',
    async (token) => {
        const response = await axios.get(routes.messagesPath(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
);

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();


const messagesSlice = createSlice({
    name: 'messages',
    initialState, //просто редьюсер для новых сообщений от сервера
    extraReducers: (builder) => {
        builder
            .addCase(addDataMessages.fulfilled, (state, action) => {
                messagesAdapter.addMany(state, action);   
            })
    },
});

export const selectorsMessages = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;