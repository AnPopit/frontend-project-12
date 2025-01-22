import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import routes from '../routes.js';


import PublicPage from './PublicPage.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './errorPage.jsx';
import Header from './Header.jsx';
import SignupPage from './SignupPage.jsx';

const PrivateRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);
    console.log(auth.token)
    return (
        auth.token ? children : <Navigate to={routes.onlyLoginPath()} />
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
            <Route path="/signup" element={<SignupPage />} />
        </Routes>

    </Router>
);

export default App;

/*
1. Сделать сообщения и каналы компонентами
2. Заблокировать инпут и кнопки при сабмите, у формика isSubmiting login
3. Сделать фокус на инпуте login
*/
