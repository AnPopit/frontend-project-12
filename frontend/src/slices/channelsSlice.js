import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';


const initialState = {list: [], activeChannel: {id: 1, name: 'general'}}

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannel: (state, action) => {
            state.list = [...state.list, ...action.payload];
        },
        setActiveChannel: (state, action) => {
            state.activeChannel = action.payload; //удаление и переимнование - через обычные редьюсеры 
        },
    },
});

export const { setChannel, setActiveChannel } = channelsSlice.actions;
export default channelsSlice.reducer;