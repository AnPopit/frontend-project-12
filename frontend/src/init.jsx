/* eslint-disable functional/no-expression-statement */

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
import { setMessages } from './slices/messagesSlice.js';
import { setChannel, delChannel, updateChannel } from './slices/channelsSlice.js';

const init = async () => {
    const i18n = i18next.createInstance();
    await i18n
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
    })//добавить сокеты на действия с каналами

    //socket.on('newChannel', (payload) => {
     //   store.dispatch(setChannel(payload))   
       // console.log(payload) // { id: 6, name: "new channel", removable: true }
   // });

    //socket.on('removeChannel', (payload) => {
     //   store.dispatch(delChannel(payload))   
     //   console.log(payload); // { id: 6 };
  //  });

   // socket.on('renameChannel', (payload) => {
   //     store.dispatch(updateChannel(payload))   
   //     console.log(payload); // { id: 7, name: "new name channel", removable: true }
  //  });



    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <Component />
            </I18nextProvider>
        </Provider>
    )
}

export default init;