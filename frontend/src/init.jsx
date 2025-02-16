import React from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import resources from './locales/index.js';
import store from './slices/index.js';

import Component from './components/App.jsx';
import { setMessages } from './slices/messagesSlice.js';
/// import {
// addChannel,
// } from './slices/channelsSlice.js';
import {
  delChannel, updateChannel, addChannel,
} from './slices/channelsSlice.js';

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

  const socket = io();
  socket.on('newMessage', (payload) => {
    store.dispatch(setMessages(payload));
  });// добавить сокеты на действия с каналами

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(delChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(updateChannel(payload));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Component />
      </I18nextProvider>
    </Provider>
  );
};

export default init;
