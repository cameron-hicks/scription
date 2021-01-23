import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import ScrCreator from './ScrCreator.jsx';

const MainContainer = () => {
  const [displayScrCreator, setDisplay] = useState(false);
  const [authStr, setAuthStr] = useState('');
  let myContext = new AudioContext();
  const [scriptions, setScriptions] = useState([]);
  // const [fetched, setFetched] = useState(false); // an empty dependency array will prevent an infinite loop
  const fetchScriptions = useCallback(() => {
    fetch('/api')
      .then(res => res.json())
      .then((fetched) => {
        if(!fetched.length) fetched = [];

        setScriptions(fetched);
        // setFetched(true);
        return;
      })
      .catch(err => console.log('Feed.useEffect ERROR: ', err));
  }, [])
  // TODO: limit # of results
  useEffect(() => {
    fetchScriptions()
  }, []);
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
            {displayScrCreator ? 'Cancel ' : 'New Scription'}
            {displayScrCreator && <i className="fas fa-times"></i>}
          </button>
        </div>
        <div className="MainContainer-content">
          {displayScrCreator ? <ScrCreator myContext={myContext} onCreate={() => fetchScriptions()} /> : ''}
          <Navbar />
          <Feed myContext={myContext} scriptions={scriptions} />
        </div>
      </div>
      <footer>
        <p>Created by Cameron Baumgartner | <a href="https://github.com/cameronbaumgartner">Github</a> | <a href="https://linkedin.com/in/cameronbaumgartner">LinkedIn</a></p>
      </footer> 
    </div>
  );
}

export default MainContainer;
