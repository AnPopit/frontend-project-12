
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes.js';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import { setChannel, setActiveChannel } from '../slices/channelsSlice.js'


const Channel = (props) => {
    const { setAddChannel, setDelChannel,  setUpdateChannel, setchannelForAction} = props
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const channels = useSelector((state) => state.channels);
    

    const setChannelFun = (id, name) => () => {
        const channel = { id, name } //откуда брать ID???
        dispatch(setActiveChannel(channel))
    }



    useEffect(() => {
        const getChannel = async (token) => {
            const response = await axios.get(routes.channelsPath(), { //try catch
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(setChannel(response.data))
        }
        getChannel(auth.token);
    }, []);

    const handleAddChannel = () => {
        setAddChannel(true)
    }
    const handleDelModal = (obj) => () => {
        setchannelForAction(obj)
        setDelChannel(true)
    }
    const handleUpdateModal = (obj) => () => {
        setchannelForAction(obj)
        setUpdateChannel(true)
    }

    console.log(channels)



    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button onClick={handleAddChannel} className="p-0 text-primary btn btn-group-vertical">
                    <PlusSquare size={20} />
                </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.list.map((el) => { //условие по removable
                    if (el.removable) {
                        return (
                            <li key={el.id} className="nav-item w-100">
                                <div role="group" className="d-flex dropdown btn-group">
                                    <Button onClick={setChannelFun(el.id, el.name)}
                                        type="button"
                                        className="w-100 rounded-0 text-start text-truncate"
                                        variant='secondary'
                                    >
                                        <span className="me-1">#</span>
                                        {el.name}
                                    </Button>
                                    <Dropdown as={ButtonGroup} className="d-flex">
                                        <Dropdown.Toggle variant='secondary' split className="flex-grow-0">
                                        <span className="visually-hidden">Управление каналом</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={handleDelModal({id: el.id, name: el.name})}>
                                                Удалить
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={handleUpdateModal({id: el.id, name: el.name})}>
                                                Переименовать
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </li>
                        )
                    } else {
                        return (
                            <li className="nav-item w-100" key={el.id}>
                                <button type="button" onClick={setChannelFun(el.id, el.name)} className="w-100 rounded-0 text-start btn btn-secondary"><span className="me-1">#</span>{el.name}</button>
                            </li>
                        )
                    }

                })}
            </ul>
        </div>
    )


}

export default Channel;