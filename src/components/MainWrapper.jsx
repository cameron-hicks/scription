import React, { useState } from 'react';
import MainContainer from './MainContainer.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const MainWrapper = () => {
  const [authType, setAuthType] = useState('');

  const displayAuthForm = (authType) => {
    switch(authType){
      case 'signup':
        return <Signup />;
      case 'login':
        return <Login />;
      default:
        return '';
    }
  }

  return (
    <div className="main-wrapper">
      <header className="banner">
        <h1>Scription</h1>
        {/* control whether an auth component renders, and which type of auth component, using a drop-down menu and a cancel button */}
        {authType && <button><i className="fas fa-times" onClick={() => setAuthType('')}></i></button>}
        <select defaultValue="" placeholder="" onChange={(event) => setAuthType(event.target.value)}>
        <option value="" disabled>log in/sign up</option>
          <option value="login">log in</option>
          <option value="signup">sign up</option>
        </select>
      </header>

      {authType && displayAuthForm(authType)}
      {!authType && <MainContainer />}

      <footer>
        <p>Created by Cameron Baumgartner | <a href="https://github.com/cameronbaumgartner">Github</a> | <a href="https://linkedin.com/in/cameronbaumgartner">LinkedIn</a></p>
      </footer> 
    </div>
  )
};

export default MainWrapper;