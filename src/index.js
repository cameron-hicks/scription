import React from 'react';
import ReactDOM from 'react-dom';
import MainContainer from './components/MainContainer';
import "./scss/index.scss";

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <MainContainer />
  </React.StrictMode>,
  root
);
