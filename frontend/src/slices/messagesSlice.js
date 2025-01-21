import { createSlice } from '@reduxjs/toolkit';


const initialState = {}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state[action.payload.id] = action.payload
        },
        delChannelFromMessages: (state, action) => {
            const id = action.payload;
            Object.keys(state).map((el) => {
                state[el].channelId === id ? delete state[el] : null
            })
            ;
        },
    },
   
});

export const { setMessages, delChannelFromMessages } = messagesSlice.actions;
export default messagesSlice.reducer;