import React from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import resources from './locales/index.js';
import store from './slices/index.js';

import Component from './components/App.jsx';
import { setMessages } from './slices/messagesSlice.js';
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

  const rollbarConfig = {
    accessToken: '4ac36b7a96774ef58b053a1752d3f4cf',
    environment: 'production',
  };

  const socket = io();
  socket.on('newMessage', (payload) => {
    store.dispatch(setMessages(payload));
  });

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
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Component />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
