import 'babel-polyfill'; // eslint-disable-line

import React from 'react';
import { render } from 'react-dom';

import styles from './index.css'; // eslint-disable-line

import App from './components/App';

render(<App />, document.getElementById('index'));
