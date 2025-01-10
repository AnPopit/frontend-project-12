import React, { useState } from 'react';
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


const App = () => (
    <Router>
        <div className="container p-3">
            <h1 className="text-center mt-5 mb-4"></h1>
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<PublicPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>

    </Router>
);

export default App;