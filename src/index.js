import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import "./scss/index.scss";

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  root
);
