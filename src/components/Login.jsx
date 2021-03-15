import React, { useState } from 'react';

const Login = ({ closeAuthForm }) => {
  const [typedUsername, setTypedUsername] = useState('');
  const [password, setPassword] = useState('');

  const sendLogin = () => {
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: typedUsername,
        password
      })
    })
      .then(res => res.json())  
      .then(data => {
        closeAuthForm();
      })
      .catch(error => {
        alert('Something went wrong...');
        console.error('ERROR logging in:', error)
      });
  }

  return (
    <div className="auth-container">
      <div className="form">
      <h2>Log In</h2>
      <div>
        <input type="text" 
                placeholder="username"
                value={typedUsername}
                onChange={(e) => setTypedUsername(e.target.value)}></input>
        <input type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={sendLogin}>Log in</button>
      </div>
      </div>
    </div>
  );
}

export default Login;