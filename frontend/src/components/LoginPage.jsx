import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import routes from '../routes.js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from '../slices/authSlice.js';
import _ from 'lodash';


const LoginPage = () => {
    const inputRef = useRef();
    const [authFailed, setAuthFailed] = useState(false);
    const [error, setError] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            setAuthFailed(false);
            try {
                const res = await axios.post(routes.loginPath(), values);
                res.data.id = _.uniqueId()
                dispatch(logIn(res.data))
                navigate('/');
            } catch (err) {
                formik.setSubmitting(false);
                setError(err.message)
                setAuthFailed(true);
                throw err;
            }
        }
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={authFailed}
                  required
                  ref={inputRef} />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={authFailed}
                  required />
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
};

export default LoginPage;