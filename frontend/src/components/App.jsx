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
import { ToastContainer, toast } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'


import PublicPage from './PublicPage.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import Header from './Header.jsx';
import SignupPage from './SignupPage.jsx';

const rollbarConfig = {
    accessToken: '4ac36b7a96774ef58b053a1752d3f4cf',
    environment: 'testenv',
};

function TestError() {
    const a = null;
    return a.hello();
}



const PrivateRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);
    console.log(auth.token)
    return (
        auth.token ? children : <Navigate to={routes.onlyLoginPath()} />
    );
};


const App = () => (
    <>
        <Provider config={rollbarConfig}>
            <ErrorBoundary>
                <div className="d-flex flex-column h-100">
                    <Router>
                        <Header></Header>
                        <Routes>
                            <Route path={routes.onlyErrorPath()} element={<ErrorPage />} />
                            <Route path={routes.onlyPublickPath()} element={(
                                <PrivateRoute>
                                    <PublicPage />
                                </PrivateRoute>
                            )} />
                            <Route path={routes.onlyLoginPath()} element={<LoginPage />} />
                            <Route path={routes.onlySignupPath()} element={<SignupPage />} />
                        </Routes>
                    </Router>
                </div>
                <ToastContainer />
            </ErrorBoundary>
        </Provider>
    </>
);

export default App;

/*
1. Сделать сообщения и каналы компонентами
2. Заблокировать инпут и кнопки при сабмите, у формика isSubmiting login
3. Сделать фокус на инпуте login
*/
