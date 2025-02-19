import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import routes from '../routes.js';
import PublicPage from './PublicPage.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './NotFoundPage.jsx';
import Header from './Header.jsx';
import SignupPage from './SignupPage.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return (
    auth.token ? children : <Navigate to={routes.onlyLoginPath()} />
  );
};

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <Router>
        <Header />
        <Routes>
          <Route path={routes.onlyErrorPath()} element={<ErrorPage />} />
          <Route
            path={routes.onlyPublicPath()}
            element={(
              <PrivateRoute>
                <PublicPage />
              </PrivateRoute>
            )}
          />
          <Route path={routes.onlyLoginPath()} element={<LoginPage />} />
          <Route path={routes.onlySignupPath()} element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
    <ToastContainer />
  </>
);

export default App;
