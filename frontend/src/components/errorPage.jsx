import errorImg from '../assets/error.svg';
import {
    Link
  } from 'react-router-dom';
  import routes from '../routes.js';
  import React from 'react';


const ErrorPage = () => {
    return (
        <div className="text-center"><img alt="Страница не найдена" className="img-fluid h-25" width="500" height="600" src={errorImg}/>
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">Но вы можете перейти <Link to={routes.onlyPublickPath()}>на главную страницу</Link></p>
            </div> 
    )
  };

  export default ErrorPage;

  //переименовать файл ErrorPage