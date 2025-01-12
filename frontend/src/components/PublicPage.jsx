import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { selectorsChannels } from '../slices/channelsSlice.js';
import { addDataChannels } from '../slices/channelsSlice.js';
import { selectorsMessages } from '../slices/messagesSlice.js';
import { addDataMessages } from '../slices/messagesSlice.js';
import renderChat from '../render/renderChat.jsx';

const PublicPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = JSON.parse(localStorage.getItem('user'))
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        !token ? navigate('/login') : null
    }, []);


    dispatch(addDataChannels(token))
    dispatch(addDataMessages(token))
    const channels = useSelector(selectorsChannels.selectAll);
    const messages = useSelector(selectorsMessages.selectAll);

    console.log(channels)





    return (
        renderChat(channels, messages)
    )
};

export default PublicPage;