import React, { useState, useEffect } from 'react';

const Login = () => {

  return (
    <div className="auth-container">
      <form>
        <input type="text" placeholder="username"></input>
        <input type="password" placeholder="password"></input>
        <button>Log in</button>
      </form>
    </div>
  );
}

export default Login;