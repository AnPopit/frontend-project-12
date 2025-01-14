import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
;


import Channel from './Channel.jsx';
import Messages from './Messages.jsx';

const PublicPage = () => {
    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <Channel></Channel>
                <Messages></Messages>
            </div>
        </div>




        //renderChat(channels, messages) //сделать компоненты chat (отдельные компоненты для каналов и сообщений), modal
    )
};

export default PublicPage;
