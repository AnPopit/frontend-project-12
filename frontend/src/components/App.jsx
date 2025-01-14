import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useLocation,
} from 'react-router-dom';
//import { Button, Navbar, Nav } from 'react-bootstrap';

import PublicPage from './PublicPage.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './errorPage.jsx';

const PrivateRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);
    return (
        auth.token ? children : <Navigate to="/login" /> //заменить на токен, из слайса брать
    );
};


const App = () => (
    <Router>
        <div className="container p-3">
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={(
                    <PrivateRoute>
                        <PublicPage />
                    </PrivateRoute>
                )} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>

    </Router>
);

export default App;

/*
1. Сделать сообщения и каналы компонентами
2. Заблокировать инпут и кнопки при сабмите, у формика isSubmiting login
3. Сделать фокус на инпуте login
*/
