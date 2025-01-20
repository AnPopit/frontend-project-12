import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useLocation,
} from 'react-router-dom';


import PublicPage from './PublicPage.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './errorPage.jsx';
import Header from './Header.jsx';

const PrivateRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);
    console.log(localStorage.getItem('user'))
    return (
        auth.token ? children : <Navigate to="/login" />
    );
};


const App = () => (
    <Router>
        <Header></Header>
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={(
                <PrivateRoute>
                    <PublicPage />
                </PrivateRoute>
            )} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>

    </Router>
);

export default App;

/*
1. Сделать сообщения и каналы компонентами
2. Заблокировать инпут и кнопки при сабмите, у формика isSubmiting login
3. Сделать фокус на инпуте login
*/
