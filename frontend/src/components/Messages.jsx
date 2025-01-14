import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { io } from "socket.io-client";
import {  addDataMessages } from '../slices/messagesSlice.js';
import { selectorsMessages } from '../slices/messagesSlice.js';
import { selectorsChannels } from '../slices/channelsSlice.js';
import axios from 'axios';

const Messages = (props) => {
    const socket = io("ws://localhost:5002")
    socket.on('newMessage', (payload) => {
        console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    })
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    dispatch(addDataMessages(auth.token))
    const messages = useSelector(selectorsMessages.selectAll);
    const channels = useSelector(selectorsChannels.selectAll);
    console.log(channels)



    const formik = useFormik({
        initialValues: {
            messages: "",
        },
        onSubmit: (values) => {
            const newMessage = {body: values.messages, channelId: '1', username: 'admin'}
            axios.post('/api/v1/messages', newMessage, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }).then((response) => {
                    console.log(response.data); // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
                });
            },
        });


    return (
        <div class="col p-0 h-100">
            <div class="d-flex flex-column h-100">
                <div class="bg-light mb-4 p-3 shadow-sm small"><
                    p class="m-0"><b># general</b></p><span class="text-muted">1 сообщение</span>
                </div>
                <div id="messages-box" class="chat-messages overflow-auto px-5 ">
                    <div class="text-break mb-2"><b>admin</b>: 1</div>
                </div>
                <div className="mt-auto px-5 py-3">
                    <Form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Control aria-label="Новое сообщение" className="border-0 p-0 ps-2 form-control" id="messages" name="messages" value={formik.values.messages} onChange={formik.handleChange} placeholder="Введите сообщение..." />
                            <Button type="submit" disabled="" className="btn btn-group-vertical">
                                <ArrowRightSquare size={20} />
                                <span class="visually-hidden">Отправить</span>
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )


}

export default Messages;

