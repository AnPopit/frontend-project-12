import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const addDataChannels = createAsyncThunk(
    'channels/addDataChannels',
    async (token) => {
        const response = await axios.get(routes.channelsPath(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //console.log(response)
        return response.data;
    },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();


const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addDataChannels.fulfilled, (state, action) => {
                channelsAdapter.addMany(state, action);   
            })
    },
});

export const selectorsChannels = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;