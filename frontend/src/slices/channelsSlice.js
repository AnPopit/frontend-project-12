import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';


const initialState = { list: [], activeChannel: { id: 1, name: 'general' } }

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
        delChannel: (state, action) => {
            const id = action.payload;
            state.list = state.list.filter((el) => el.id !== id);
            state.activeChannel = { id: 1, name: 'general' }

        },
        updateChannel: (state, action) => {
            state.list = state.list.map((el) => {
                console.log(el.id)
                console.log(action.payload.id)
                if (el.id === action.payload.id) {
                    el.name = action.payload.name
                    
                    return el
                }
                return el
            })


        },
    },
});

export const { setChannel, setActiveChannel, delChannel, updateChannel } = channelsSlice.actions;
export default channelsSlice.reducer;