
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { io } from "socket.io-client";
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { setMessages } from '../slices/messagesSlice.js';
//import { selectorsChannels } from '../slices/channelsSlice.js';
import axios from 'axios';
import routes from '../routes.js';

const Messages = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const socket = io("ws://localhost:5002")
    socket.on('newMessage', (payload) => {
        dispatch(setMessages(payload))
    })

    //socket.emit("newMessage", (response) => {
    //     console.log(response.status); // мне надо получить ответ от сервера???
    //  });

    useEffect(() => {
        const getMessages = async (token) => {
            const response = await axios.get(routes.messagesPath(), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //dispatch(setMessages(response.data)) надо ли это?
        }
        getMessages(auth.token);
    }, []);

    const messages = useSelector((state) => state.messages);
    const channels = useSelector((state) => state.channels);

    const activeChannel = channels.activeChannel;
    const username = auth.username

    console.log(`activeChannel: ${activeChannel.id}`)


    const formik = useFormik({
        initialValues: {
            messages: "",
        },
        onSubmit: (values) => {

            const newMessage = { body: values.messages, channelId: activeChannel.id, username: username } //try catch
            axios.post(routes.messagesPath(), newMessage, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            }).then((response) => {
                dispatch(setMessages(response.data))
            });
        },
    });

    const getArrayMessage = (idChannel) => {
        const res = []
        Object.keys(messages).map((el) => {
            console.log(messages[el])
            messages[el].channelId === idChannel ? res.push(messages[el]) : null
        })
        return res
    }

    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b># {activeChannel.name}</b></p><span className="text-muted">{getArrayMessage(activeChannel.id).length} сообщение</span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                    {getArrayMessage(activeChannel.id).map((el) => {
                        return (
                            <div key={_.uniqueId()} className="text-break mb-2"><b>{el.username}</b>: {el.body}</div>
                        )
                    })}


                </div>
                <div className="mt-auto px-5 py-3">
                    <Form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                        <Form.Group  className="input-group has-validation">
                            <Form.Control aria-label="Новое сообщение" className="border-0 p-0 ps-2 form-control" id="messages" name="messages" value={formik.values.messages} onChange={formik.handleChange} placeholder="Введите сообщение..." />
                            <button type="submit" disabled="" className="btn btn-group-vertical">
                                <ArrowRightSquare fill="currentColor" size={20} />
                            </button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )


}

export default Messages;

