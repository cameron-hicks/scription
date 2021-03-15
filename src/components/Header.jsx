import React, { useState, useEffect } from 'react';

const Header = ({authType, setAuthType}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('/auth')
    .then(res => res.json())
    .then(data => {
      // if user has cookie, use it to set state
      if (!data.username) return;
      setUsername(data.username);
    })
    .catch(error => console.error('Problem getting cookies:', error));
  });

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

  return (
    <header className="banner">
      <h1>Scription</h1>
      <div className="auth-btns">
        {displayUsernameOrAuthSelect(username)}
      </div>
    </header>
  );
}

export default Header;