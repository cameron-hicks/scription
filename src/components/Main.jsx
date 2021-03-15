import React, { useState } from 'react';
import Header from './Header';
import Feed from './Feed.jsx';
import ScrCreator from './ScrCreator.jsx';
import Login from './Login';
import Signup from './Signup';
import AudioContextContext from '../hooks/AudioContext';

const Main = () => {
  let audio = new AudioContext();
  const [authType, setAuthType] = useState('');
  const [showScrCreator, setShow] = useState(false);

  const displayAuthForm = (authType) => {
    switch(authType){
      case 'signup':
        return <Signup closeAuthForm={() => setAuthType('')}/>;
      case 'login':
        return <Login closeAuthForm={() => setAuthType('')}/>;
      default:
        return '';
    }
  }

  return (
    <AudioContextContext.Provider value={audio}>
      <div className="MainWrapper">
        <Header authType={authType} setAuthType={setAuthType}/>

        {authType
          ? displayAuthForm(authType)
          : (<main className="MainContainer">
              <button 
                id="show-scr-creator"
                onClick={() => setShow(!showScrCreator)}>
                {showScrCreator ? <i className="fas fa-times"></i> : 'New Scription' }
              </button>
              {showScrCreator && <ScrCreator /> }
              <Feed />
            </main>)}

        <footer>
          <p>Created by Cameron Baumgartner | <a href="https://github.com/cameronbaumgartner">Github</a> | <a href="https://linkedin.com/in/cameronbaumgartner">LinkedIn</a></p>
        </footer> 
      </div>
    </AudioContextContext.Provider>
  )
};

export default Main;