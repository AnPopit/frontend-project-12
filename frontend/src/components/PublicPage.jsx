import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { selectorsChannels } from '../slices/channelsSlice.js';
import { addDataChannels } from '../slices/channelsSlice.js';
import { selectorsMessages } from '../slices/messagesSlice.js';
import { addDataMessages } from '../slices/messagesSlice.js';
import Channel from './Channel.jsx';
import Messages from './Messages.jsx';

const PublicPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = JSON.parse(localStorage.getItem('user'))
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        !token ? navigate('/login') : null
    }, []); //сделать приватный путь 


    dispatch(addDataChannels(token))
    dispatch(addDataMessages(token))
    const channels = useSelector(selectorsChannels.selectAll);
    const messages = useSelector(selectorsMessages.selectAll);

    console.log(messages)




    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <Channel channels={channels}></Channel>
                <Messages messages={messages}></Messages>
            </div>
        </div>




        //renderChat(channels, messages) //сделать компоненты chat (отдельные компоненты для каналов и сообщений), modal
    )
};

export default PublicPage;
