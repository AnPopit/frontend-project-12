import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Navbar } from 'react-bootstrap';
import routes from '../routes.js';
import { logOut } from '../slices/authSlice.js';

const Header = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const logOutFun = () => {
    dispatch(logOut());
    navigate(routes.onlyLoginPath());
  };

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white navbar navbar-expand navbar-light">
      <div className="container">
        <Navbar.Brand as={Link} to={routes.onlyPublickPath()}>
          {t('hexletChat')}
        </Navbar.Brand>
        {auth.token ? <button onClick={logOutFun} type="button" className="btn btn-primary">{t('logout')}</button> : null}
      </div>
    </Navbar>
  );
};

export default Header;
