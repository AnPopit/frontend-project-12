import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import routes from '../routes.js';
import { logIn } from '../slices/authSlice.js';
import loginImg from '../assets/login.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        dispatch(logIn(res.data));
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        toast.error(t('errors.network'));
      }
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center"><img src={loginImg} width="200" height="200" className="rounded-circle" alt="Войти" /></div>
              <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    disabled={formik.isSubmitting}
                    placeholder="username"
                    name="username"
                    autoComplete="username"
                    id="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    value={formik.values.password}
                    placeholder="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{t('login.authFailed')}</Form.Control.Feedback>
                </Form.Group>
                <button disabled={formik.isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('login.submit')}</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('login.newToChat')}
                  {' '}
                </span>
                <Link to={routes.onlySignupPath()}>{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
