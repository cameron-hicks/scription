import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import "./scss/index.scss";
import './vendor/abcjs/abcjs-audio.css';   // playback widget styles

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  root
);
