import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
;


import Channel from './Channel.jsx';
import Messages from './Messages.jsx';
import ModalAddChannel from './ModalAddChannel.jsx';

const PublicPage = () => {
    const [isAddChannel, setAddChannel] = useState(false)

    return (
        <>
        
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <Channel setAddChannel={setAddChannel}></Channel>
                <Messages></Messages>
                
            </div>
        </div>
        {isAddChannel? <ModalAddChannel setAddChannel={setAddChannel}></ModalAddChannel> : null}
        </>
    )
};

export default PublicPage;
