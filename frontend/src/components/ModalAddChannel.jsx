import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { setChannel, setActiveChannel } from '../slices/channelsSlice.js'

// BEGIN (write your solution here)
const Add = (props) => {
    const { setAddChannel } = props
    const channels = useSelector((state) => state.channels);
    const inputEl = useRef(null);
    const [error, setError] = useState('');
    const [isError, setisError] = useState(false);
    const getArrayChannel = () => {
        const arrayChannel = []
        channels.list.map((el) => {
            arrayChannel.push(el.name)
        })
        return arrayChannel
    }

    const schema = yup.object({
        name: yup.string()
            .required()
            .min(3)
            .max(8)
            .notOneOf(
                getArrayChannel(),
                'Должно быть уникальным',
            ),
    });

    useEffect(() => {
        inputEl.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
    });
    const handleClose = () => setAddChannel(false);
    const dispatch = useDispatch();

    const addChannel = () => {
        setisError(false)
        try {
            schema.validateSync(
                { name: formik.values.name },
                { abortEarly: false },
            );
            dispatch(setActiveChannel({ id: _.uniqueId(), name: formik.values.name }))
            const newChannel = [{ id: _.uniqueId(), name: formik.values.name, removable: true }];
            dispatch(setChannel(newChannel))
            setAddChannel(false)
        } catch (e) {
            formik.setSubmitting(false);
            setError(e.errors);
            setisError(true)
        }
    }
    return (
        <Modal show>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>Добавить канал</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <Form.Label>Имя канала</Form.Label>
                            <FormControl isInvalid={isError} id="name" name="name" className="mb-2 form-control" ref={inputEl} onChange={formik.handleChange} value={formik.values.name}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>

                            <div className="invalid-feedback"></div>
                        </FormGroup>
                        <Modal.Footer>
                            <Button onClick={handleClose} variant="secondary" disabled={formik.isSubmitting}>
                                Отменить
                            </Button>
                            <Button onClick={addChannel} variant="primary" type="submit">
                                Отправить
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
        </Modal>

    )
}

export default Add