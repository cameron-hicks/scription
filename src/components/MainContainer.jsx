import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import ScrCreator from './ScrCreator.jsx';

const MainContainer = () => {
  const [displayScrCreator, setDisplay] = useState(false);
  let myContext = new AudioContext();

  return (
    <div className="mainWrapper">
      <div className="MainContainer">
        <header className="MainContainer-header">
          <h1>Scription</h1>
        </header>
        <div className="right-align-btns">
          <button onClick={() => setDisplay(!displayScrCreator)}>
            {displayScrCreator ? 'cancel ' : 'New Scription'}
            {displayScrCreator ? <i className="fas fa-times"></i> : '' }
          </button>
        </div>
        <div className="MainContainer-content">
          {displayScrCreator ? <ScrCreator myContext={myContext}/> : ''}
          <Navbar />
          <Feed myContext={myContext}/>
        </div>
      </div>
      <footer>
        <p>Created by Cameron Baumgartner | <a href="https://github.com/cameronbaumgartner">Github</a> | <a href="https://linkedin.com/in/cameronbaumgartner">LinkedIn</a></p>
      </footer> 
    </div>
  );
}

export default MainContainer;
