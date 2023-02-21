import React from 'react';
import ReactDOM from 'react-dom';
import { initalizeValidation } from './utils/validation';

initalizeValidation();

// eslint-disable-next-line import/first
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
