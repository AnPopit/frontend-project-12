import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';



import Channel from './Channel.jsx';
import Messages from './Messages.jsx';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalDelChannel from './ModalDelChannel.jsx';
import ModalUpdateChannel from './ModalUpdateChannel.jsx';
import axios from 'axios';
import routes from '../routes.js';
import { setChannel } from '../slices/channelsSlice.js'
import {  toast } from 'react-toastify';

const PublicPage = () => {
    const [isAddChannel, setAddChannel] = useState(false)
    const [isDelChannel, setDelChannel] = useState(false)
    const [isUpdateChannel, setUpdateChannel] = useState(false)
    const [channelForAction, setchannelForAction] = useState('')
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        try {
            const getChannel = async (token) => {
                const response = await axios.get(routes.channelsPath(), { //try catch
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setChannel(response.data))
            }
            getChannel(auth.token);
        } catch (e) {
            toast.error(t('errors.network'))
        }

    }, [isAddChannel]); //todo зависимость НЕ от флага 


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
