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
        <label>Birthday:
          <div>
            <input type="text" className="birthday" id="year" maxLength="4" placeholder="YYYY"></input>
            <input type="text" className="birthday" id="month" maxLength="2" placeholder="MM"></input>
            <input type="text" className="birthday" id="day" maxLength="4" placeholder="DD"></input>
          </div>
        </label>
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;


/*
<p> Your birthday: </p>
          <div>
            <input type="text" placeholder="YYYY"></input>
            <input type="text" placeholder="MM"></input>
            <input type="text" placeholder="DD"></input>
          </div>
*/