import React from 'react';
import ReactDOM from 'react-dom';
import MainWrapper from './components/MainWrapper';
import "./scss/index.scss";

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <MainWrapper />
  </React.StrictMode>,
  root
);
