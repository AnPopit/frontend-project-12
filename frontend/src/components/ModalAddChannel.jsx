import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { setChannel, setActiveChannel } from '../slices/channelsSlice.js'
import routes from '../routes.js';

// BEGIN (write your solution here)
const Add = (props) => {
    const auth = useSelector((state) => state.auth);
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
            .max(20)
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
        validationSchema: schema,
        onSubmit: (values) => {
            try {
                const newChannel = { name: values.name };
                console.log(newChannel)
                axios.post(routes.channelsPath(), newChannel, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }).then((response) => {
                    dispatch(setChannel([response.data])); // => { id: '3', name: 'new channel', removable: true }
                    dispatch(setActiveChannel({ id: response.data.id, name: response.data.name }))
                    setAddChannel(false) //теперь форма закрывается после получения ответа?
                });
                

            } catch (e) {
                formik.setSubmitting(false);
                console.log(e)
            }
        }
    });

    const handleClose = () => setAddChannel(false);
    const dispatch = useDispatch();

    const checkVal = () => {
        if (formik.errors.name) {
            formik.setSubmitting(false);
            setError(formik.errors.name)
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
                        <FormControl isInvalid={isError} id="name" name="name" className="mb-2 form-control" ref={inputEl} onChange={formik.handleChange} value={formik.values.name}>
                        </FormControl>
                        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                        <div className="invalid-feedback"></div>
                    </FormGroup>
                    <Modal.Footer>
                        <Button onClick={handleClose} variant="secondary" disabled={formik.isSubmitting}>
                            Отменить
                        </Button>
                        <Button onClick={checkVal} variant="primary" type="submit">
                            Отправить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>

    )
}

export default Add