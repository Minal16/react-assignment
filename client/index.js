import 'babel-polyfill'; // eslint-disable-line
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import styles from './index.css'; // eslint-disable-line

const loggerMiddleware = createLogger();

import reducers from './reducers';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);

import App from './components/App';

render((
  <Provider store={store}>
    <App />
  </Provider>)
  , document.getElementById('index')
);
