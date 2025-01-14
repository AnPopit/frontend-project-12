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

const initialState = channelsAdapter.getInitialState({ current: '' });


const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannel: (state, action) => {
            state.current = action.payload; //как лучше организовать хранение текущего канала
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addDataChannels.fulfilled, (state, action) => {
                channelsAdapter.addMany(state, action);  
            })
    },
});

export const selectorsChannels = channelsAdapter.getSelectors((state) => state.channels);
export const { setChannel } = channelsSlice.actions;
export default channelsSlice.reducer;