import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import ScrCreator from './ScrCreator.jsx';

const MainContainer = () => {
  const [showScrCreator, setShow] = useState(false);
  let audioContext = new AudioContext();

  return (
      <main className="MainContainer">
        <div className="right-align-btns">
          <button onClick={() => setShow(!showScrCreator)}>
            {showScrCreator || 'New Scription'}
            {showScrCreator ? <i className="fas fa-times"></i> : '' }
          </button>
        </div>
        <div className="MainContainer-content">
          {showScrCreator && <ScrCreator audioContext={audioContext}/> }
          <Navbar />
          <Feed audioContext={audioContext}/>
        </div>
      </main>
  );
}

export default MainContainer;
