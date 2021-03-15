import React, { useState } from 'react';

const Signup = ({closeAuthForm}) => {
  const [typedUsername, setTypedUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const sendSignup = () => {
    if (password !== confirmPassword) {
      alert('Your passwords do not match.');
      return;
    }

    // TODO: validation
    const birthdate = year + '-' + month + '-' + day;

    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: typedUsername,
        password,
        birthdate
      })
    })
      .then(res => res.json())  
      .then(data => {
        closeAuthForm();
      })
      .catch(error => console.log('sendLogin ERROR: ', error));
  }

  return (
    <div className="auth-container">
      <div className="form">
      <h2>Create an Account</h2>
      <div>
        <input type="text" 
                placeholder="username"
                value={typedUsername}
                onChange={(e) => setTypedUsername(e.target.value)}></input>
        <input type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
        <input type="password" 
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}></input>
        <label>Birthday:
          <div>
            <input type="text" className="birthday" id="year" maxLength="4" placeholder="YYYY" value={year} onChange={(e) => setYear(e.target.value)}></input>
            <input type="text" className="birthday" id="month" maxLength="2" placeholder="MM" value={month} onChange={(e) => setMonth(e.target.value)} ></input>
            <input type="text" className="birthday" id="day" maxLength="4" placeholder="DD" value={day} onChange={(e) => setDay(e.target.value)}></input>
          </div>
        </label>
        <button onClick={sendSignup}>Sign up</button>
      </div>
      </div>
    </div>
  );
}

export default Signup;