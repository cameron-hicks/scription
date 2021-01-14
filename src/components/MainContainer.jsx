import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import ScrCreator from './ScrCreator.jsx';

const MainContainer = () => {
  const [displayScrCreator, setDisplay] = useState(false);
  const [authStr, setAuthStr] = useState('false');
  let myContext = new AudioContext();

  // TODO: finish forms (eg birthdate should be a date selector)
  const auth = (authStr) => {
    switch(authStr){
      case 'signup':
        return (
          <div>
            <input type="text" placeholder="username"></input>
            <input type="password" placeholder="password"></input>
            <input type="password" placeholder="confirm password"></input>
            <input type="text" placeholder="birthdate: YYY-MM-DD"></input>
            <button>Sign up</button>
          </div>
        );
      case 'login':
        return (
          <div>
            <input type="text" placeholder="username"></input>
            <input type="password" placeholder="password"></input>
            <button>Log in</button>
          </div>
        );
      default:
        return '';
    }
  }

  return (
    <div className="mainWrapper">
      <div className="banner">
      {auth(authStr)}
        <select defaultValue="" placeholder="" onChange={(event) => setAuthStr(event.target.value)}>
        <option value="" disabled>log in/sign up</option>
          <option value="login">log in</option>
          <option value="signup">sign up</option>
        </select>
      </div>
      <div className="MainContainer">
        <header className="MainContainer-header">
          <h1>Scription</h1>
        </header>
        <div className="right-align-btns">
          <button onClick={() => setDisplay(!displayScrCreator)}>
            {displayScrCreator ? 'cancel ' : 'New Scription'}
            {displayScrCreator ? <i className="fas fa-times"></i> : '' }
          </button>
        </div>
        <div className="MainContainer-content">
          {displayScrCreator ? <ScrCreator myContext={myContext}/> : ''}
          <Navbar />
          <Feed myContext={myContext}/>
        </div>
      </div>
      <footer>
        <p>Created by Cameron Baumgartner | <a href="https://github.com/cameronbaumgartner">Github</a> | <a href="https://linkedin.com/in/cameronbaumgartner">LinkedIn</a></p>
      </footer> 
    </div>
  );
}

export default MainContainer;
