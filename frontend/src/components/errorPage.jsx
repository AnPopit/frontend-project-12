import errorImg from '../assets/error.svg';
import {
    Link
  } from 'react-router-dom';
  import routes from '../routes.js';
  import React from 'react';
  import { useTranslation } from 'react-i18next';


const ErrorPage = () => {
  const { t } = useTranslation();
    return (
        <div className="text-center"><img alt="Страница не найдена" className="img-fluid h-25" width="500" height="600" src={errorImg}/>
            <h1 className="h4 text-muted">{t('notFound.header')}</h1>
            <p className="text-muted">{t('notFound.message')} <Link to={routes.onlyPublickPath()}>{t('notFound.linkText')}</Link></p>
            </div> 
    )
  };

  export default ErrorPage;

  //переименовать файл ErrorPage