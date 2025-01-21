import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import routes from '../routes.js';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../slices/authSlice.js';
import loginImg from '../assets/login.jpg';
//import _ from 'lodash';


const LoginPage = () => {
    
    const inputRef = useRef();
    const [authFailed, setAuthFailed] = useState(false);
    const [error, setError] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            setAuthFailed(false);
            try {
                const res = await axios.post(routes.loginPath(), values);
                dispatch(logIn(res.data))
                navigate('/');
            } catch (err) {
                formik.setSubmitting(false);
                setError(err.message)
                setAuthFailed(true);
                console.log(err)
                throw err; //ошибка сети, позже todo
            }
        }
    });
    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <div className="card shadow-sm">
                        <div className="card-body row p-5">
                            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center"><img src={loginImg} width="200" height="200" className="rounded-circle" alt="Войти"/></div>
                            <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                            <h1 className="text-center mb-4">Войти</h1>
                                <Form.Group className="form-floating mb-3">
                                    <Form.Control onChange={formik.handleChange}
                                        value={formik.values.username}
                                        disabled={formik.isSubmitting? true : false}
                                        placeholder="username"
                                        name="username"
                                        autoComplete="username"
                                        id="username"
                                        isInvalid={authFailed}
                                        required
                                        ref={inputRef} />
                                        <Form.Label htmlFor="username">Username</Form.Label>
                                </Form.Group>
                                <Form.Group className="form-floating mb-4">
                                    <Form.Control type="password"
                                        onChange={formik.handleChange}
                                        disabled={formik.isSubmitting? true : false}
                                        value={formik.values.password}
                                        placeholder="password"
                                        name="password"
                                        id="password"
                                        autoComplete="current-password"
                                        isInvalid={authFailed}
                                        required />
                                        <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                                </Form.Group>
                                <button disabled={formik.isSubmitting? true : false} type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                            </form>
                        </div>
                        <div className="card-footer p-4">
                            <div className="text-center"><span>Нет аккаунта? </span><Link to={routes.onlySignupPath()}>Регистрация</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default LoginPage;


