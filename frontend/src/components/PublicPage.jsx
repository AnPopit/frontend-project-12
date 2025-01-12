import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const PublicPage = () => {
    let navigate = useNavigate();
    const  {token}  = JSON.parse(localStorage.getItem('user'))
    const auth = useSelector((state) => state.auth);
    
    useEffect(() => {
        !token ? navigate('/login') : null
    }, []);

    console.log(token)

    

    return (
        <p className="text-muted">PUBLIC</p>
    )
};

export default PublicPage;