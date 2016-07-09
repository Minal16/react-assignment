import 'babel-polyfill'; // eslint-disable-line

import React from 'react';
import { render } from 'react-dom';
import Provider from './rx/Provider';

import styles from './index.css'; // eslint-disable-line

import App from './components/App';
import state$ from './rx/state';

render(
  <Provider state$={ state$ }>
    <App />
  </Provider>, document.getElementById('index'));
