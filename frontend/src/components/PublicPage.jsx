import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
;


import Channel from './Channel.jsx';
import Messages from './Messages.jsx';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalDelChannel from './ModalDelChannel.jsx';
import ModalUpdateChannel from './ModalUpdateChannel.jsx';

const PublicPage = () => {
    const [isAddChannel, setAddChannel] = useState(false)
    const [isDelChannel, setDelChannel] = useState(false)
    const [isUpdateChannel, setUpdateChannel] = useState(false)
    const [channelForAction, setchannelForAction] = useState('')
    const auth = useSelector((state) => state.auth);


    return (
        <>

            <div className="container h-100 my-4 overflow-hidden rounded shadow">
                <div className="row h-100 bg-white flex-md-row">
                    <Channel setAddChannel={setAddChannel} setDelChannel={setDelChannel} setUpdateChannel={setUpdateChannel} setchannelForAction={setchannelForAction}></Channel>
                    <Messages></Messages>

                </div>
            </div>
            {isAddChannel ? <ModalAddChannel setAddChannel={setAddChannel}></ModalAddChannel> : null}
            {isDelChannel ? <ModalDelChannel channelForAction={channelForAction} setDelChannel={setDelChannel}></ModalDelChannel> : null}
            {isUpdateChannel ? <ModalUpdateChannel channelForAction={channelForAction} setUpdateChannel={setUpdateChannel}></ModalUpdateChannel> : null}
        </>
    )
};

export default PublicPage;
