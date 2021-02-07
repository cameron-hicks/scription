import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sendLogin = () => {
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(data => {
      setUsername('');
    })
    .catch(error => console.log('Scription addLike ERROR: ', error));
  }

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      <form>
        <input type="text" 
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}></input>
        <input type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={sendLogin}>Log in</button>
      </form>
    </div>
  );
}

export default Login;