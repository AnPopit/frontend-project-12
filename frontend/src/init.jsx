import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales/index.js';
import { io } from "socket.io-client";
import { Provider } from 'react-redux';
import store from './slices/index.js';
import { I18nextProvider } from 'react-i18next';
import Component from './components/App.jsx';

const init = async () => {
    const i18n = i18next.createInstance();
    await i18next
        .use(initReactI18next)
        .use(LanguageDetector)
        .init({
            resources,
            fallbackLng: 'ru',
            interpolation: {
                escapeValue: false,
            },
        });


    const socket = io("ws://localhost:5002")
    socket.on('newMessage', (payload) => {
        store.dispatch(setMessages(payload))
    })

    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <Component />
            </I18nextProvider>
        </Provider>
    )
}

export default init;