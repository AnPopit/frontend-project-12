import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import routes from '../routes.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../slices/authSlice.js';
import signup from '../assets/signup.jpg';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';


const SignupPage = () => {
    const { t } = useTranslation();
    const inputRef = useRef();
    //const [error, setError] = useState('') //три состояния 

    const [isError, setisError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const schema = yup.object({
        username: yup.string()
            .required(t('signup.required'))
            .min(3, t('signup.usernameConstraints'))
            .max(20, t('signup.usernameConstraints')),
        password: yup.string()
            .required(t('signup.required'))
            .min(6, t('signup.passMin')),
        confirmPassword: yup.string()
            .required(t('signup.required'))
            .oneOf([yup.ref('password'), null], t('signup.mustMatch'))

    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            setisError(false);
            try {
                const res = await axios.post(routes.signupPath(), { username: values.username, password: values.password })
                console.log(res)
                dispatch(logIn(res.data))
                navigate(routes.onlyPublickPath());
            } catch (err) {
                formik.setSubmitting(false);
                if (err.response.status === 409) {
                    console.log('Почему ты сюда не заходишь??')
                    setisError(true);
                    inputRef.current.select();
                }
            }
        }
    });


    //const checkVal = () => {
    //  console.log(formik.touched)
    //if (formik.errors.username) {
    //    formik.setSubmitting(false);
    //    setError(formik.errors.username) //п
    //    setisError(true)
    // }
    //  }

    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <div className="card shadow-sm">
                        <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                            <div><img src={signup} width="200" height="200" className="rounded-circle" alt="Регистрация" /></div>
                            <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                                <Form.Group className="form-floating mb-3">
                                    <Form.Control onChange={formik.handleChange}
                                        value={formik.values.username}
                                        disabled={formik.isSubmitting ? true : false}
                                        placeholder="username"
                                        name="username"
                                        autoComplete="username"
                                        id="username"
                                        isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword) || isError}
                                        required
                                        ref={inputRef} />
                                    <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-floating mb-3">
                                    <Form.Control onChange={formik.handleChange}
                                        value={formik.values.password}
                                        disabled={formik.isSubmitting ? true : false}
                                        placeholder="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        id="password"
                                        isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword) || isError}
                                        required
                                    />
                                    <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-floating mb-4">
                                    <Form.Control
                                        onChange={formik.handleChange}
                                        type="password"
                                        disabled={formik.isSubmitting ? true : false}
                                        value={formik.values.confirmPassword}
                                        placeholder="confirmPassword"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        autoComplete="current-confirmPassword"
                                        isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword) || isError}
                                        required />
                                    <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>
                                {isError && <div className="invalid ">{t('signup.alreadyExists')}</div>}
                                <button disabled={formik.isSubmitting ? true : false} type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('signup.submit')}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignupPage;

