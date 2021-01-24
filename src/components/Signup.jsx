import React, { useState, useEffect } from 'react';

const Signup = () => {
   // TODO: finish form (eg security questions; birthdate should be a date selector or 3 separate inputs)

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form>
        <input type="text" placeholder="username"></input>
        <input type="password" placeholder="password"></input>
        <input type="password" placeholder="confirm password"></input>
        <input type="text" placeholder="birthdate: YYY-MM-DD"></input>
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;