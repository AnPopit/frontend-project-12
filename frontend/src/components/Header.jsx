//import { Button, Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../slices/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { Navbar } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const logOutFun = () => {
        dispatch(logOut())
        navigate(routes.onlyLoginPath());
    }

    return (
        <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white navbar navbar-expand navbar-light">
            <div className="container">
                <Navbar.Brand as={Link} to={routes.onlyPublickPath()}>
                {t('hexletChat')}
                </Navbar.Brand>
                {auth.token ? <button onClick={logOutFun} type="button" className="btn btn-primary">{t('logout')}</button> : null}
            </div>
        </Navbar>
    )
};

export default Header;

