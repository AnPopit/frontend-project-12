import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './slices/index.js';

import Component from './components/App.jsx';

const chat = document.getElementById('chat');
const root = createRoot(chat);
root.render(
    <Provider store={store}>
        <Component />
    </Provider>
);