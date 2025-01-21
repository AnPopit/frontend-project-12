import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import routes from '../routes.js';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from '../slices/authSlice.js';
import signup from '../assets/signup.jpg';
import _ from 'lodash';
import * as yup from 'yup';


const SignupPage = () => {
    const inputRef = useRef();
    const [authFailed, setAuthFailed] = useState(false);
    const [error, setError] = useState(true) //три состояния 
    const [isError, setisError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const schema = yup.object({
        username: yup.string()
                .required()
                .min(3)
                .max(20),
            password: yup.string()
            .required()
            .min(6),
            confirmPassword: yup.string()
            .required()
            .oneOf([yup.ref('password'), null])
            
        });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            setAuthFailed(false);
            try {
                axios.post(routes.signupPath(), { username: values.username, password: values.password })
                    .then((res) => {
                        dispatch(logIn(res.data))
                        navigate('/');
                    });
            } catch (err) {
                formik.setSubmitting(false);
                setError(err.message)
                setAuthFailed(true);
                console.log(err)
                console.log(e)
            }
        }
    });

    const checkVal = () => {
        console.log(formik.errors)
        if (formik.errors.username) {
            formik.setSubmitting(false);
            setError(formik.errors.username)
            setisError(true)
        }
    }

    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <div className="card shadow-sm">
                        <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                            <div><img src={signup} width="200" height="200" className="rounded-circle" alt="Регистрация" /></div>
                            <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                                <h1 className="text-center mb-4">Регистрация</h1>
                                <Form.Group className="form-floating mb-3">
                                    <Form.Label htmlFor="username">Username</Form.Label>
                                    <Form.Control onChange={formik.handleChange}
                                        value={formik.values.username}
                                        disabled={formik.isSubmitting ? true : false}
                                        placeholder="username"
                                        name="username"
                                        autoComplete="username"
                                        id="username"
                                        isInvalid={authFailed || isError}
                                        required
                                        ref={inputRef} />
                                </Form.Group>
                                <Form.Group className="form-floating mb-3">
                                    <Form.Label htmlFor="password">password</Form.Label>
                                    <Form.Control onChange={formik.handleChange}
                                        value={formik.values.password}
                                        disabled={formik.isSubmitting ? true : false}
                                        placeholder="password"
                                        name="password"
                                        autoComplete="password"
                                        id="password"
                                        isInvalid={authFailed || isError}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group className="form-floating mb-4">
                                    <Form.Label htmlFor="confirmPassword">confirmPassword</Form.Label>
                                    <Form.Control type="confirmPassword"
                                        onChange={formik.handleChange}
                                        disabled={formik.isSubmitting ? true : false}
                                        value={formik.values.confirmPassword}
                                        placeholder="confirmPassword"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        autoComplete="current-confirmPassword"
                                        isInvalid={authFailed || isError}
                                        required />
                                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                                </Form.Group>
                                <button disabled={formik.isSubmitting ? true : false} onClick={checkVal} type="submit" className="w-100 mb-3 btn btn-outline-primary">Зарегистрироваться</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignupPage;

