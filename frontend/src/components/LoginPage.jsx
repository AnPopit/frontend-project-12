import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const LoginPage = () => {
    const usernameInput = useRef(null)
    const passwordInput = useRef(null)

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
    });
    return (
        <Form>
            <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control ref={usernameInput} id="username" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder="username" />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control ref={passwordInput} id="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
};

export default LoginPage;