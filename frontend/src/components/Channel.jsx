import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import _ from 'lodash';
import { selectorsChannels } from '../slices/channelsSlice.js';
import { addDataChannels,  setChannel } from '../slices/channelsSlice.js'


const Channel = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const setChannelFun = (id) => () => {
       dispatch(setChannel(id))
    }

    dispatch(addDataChannels(auth.token))
    const channels = useSelector(selectorsChannels.selectAll);
    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button className="p-0 text-primary btn btn-group-vertical">
                    <PlusSquare size={20} />
                </Button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map((el) => {
                    const id = _.uniqueId()
                    return (
                        <li className="nav-item w-100" key={id}>
                            <button type="button" onClick={setChannelFun(id)} className="w-100 rounded-0 text-start btn btn-secondary"><span className="me-1">#</span>{el.name}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )


}

export default Channel;