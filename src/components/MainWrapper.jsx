import React, { useState } from 'react';
import MainContainer from './MainContainer.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const MainWrapper = () => {
  const [username, setUsername] = useState('');
  const [authType, setAuthType] = useState('');

  // if user has an active cookie, display their username
  // else display log in/sign up dropdown
  fetch('/auth')
    .then(res => res.json())
    .then(data => {
      // console.log('Checked for cookies.', data);
      // if user has cookie, use it to set state
      if (!data.username) return;
      setUsername(data.username);
    })
    .catch(error => console.error('Problem getting cookies:', error));

  const displayUsernameOrAuthSelect = (username) => {
    if (!username) {
      return (
        <span>
          {authType && <button id="cancel-auth"><i className="fas fa-times" onClick={() => setAuthType('')}></i></button>}
          <select defaultValue="" onChange={(event) => setAuthType(event.target.value)}>
            <option value="" disabled>log in/sign up</option>
            <option value="login">log in</option>
            <option value="signup">sign up</option>
          </select>
        </span>);
    }

    return <a href="#">{username}</a>;
  }

  const displayAuthForm = (authType) => {
    switch(authType){
      case 'signup':
        return <Signup setDisplayedUsername={setUsername} closeAuthForm={() => setAuthType('')}/>;
      case 'login':
        return <Login setDisplayedUsername={setUsername} closeAuthForm={() => setAuthType('')}/>;
      default:
        return '';
    }
  }

  return (
    <div className="MainWrapper">
      <header className="banner">
        <h1>Scription</h1>
        <div className="auth-btns">
          {displayUsernameOrAuthSelect(username)}
        </div>
      </header>

      {authType
        ? displayAuthForm(authType)
        : <MainContainer />}

      <footer>
        <p>Created by Cameron Baumgartner | <a href="https://github.com/cameronbaumgartner">Github</a> | <a href="https://linkedin.com/in/cameronbaumgartner">LinkedIn</a></p>
      </footer> 
    </div>
  )
};

export default MainWrapper;