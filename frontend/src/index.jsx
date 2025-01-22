import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18next.js'

import Component from './components/App.jsx';

const chat = document.getElementById('chat');
const root = createRoot(chat);
root.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <Component />
        </I18nextProvider>
    </Provider>
);