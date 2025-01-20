import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { setChannel, setActiveChannel, delChannel } from '../slices/channelsSlice.js'
import { delChannelFromMessages } from '../slices/messagesSlice.js'

const Del = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const { setDelChannel, channelForAction } = props

    const handleDelChannel = () => {

       
        try {
            axios.delete(`/api/v1/channels/${channelForAction.id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            }).then((response) => {
                dispatch((delChannel(response.data.id)))
                dispatch((delChannelFromMessages(response.data.id)))
                setDelChannel(false)

            });
        } catch (e) {
            console.log(e)
        }
    }

    const handleClose = () => setDelChannel(false);


    return (
        <Modal show>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">Уверены?</p>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">
                        Отменить
                    </Button>
                    <Button onClick={handleDelChannel} variant="danger" type="submit">
                        Удалить
                    </Button>
                </Modal.Footer>

            </Modal.Body>
        </Modal>
    )
}

export default Del