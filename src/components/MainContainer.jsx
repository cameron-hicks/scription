import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import ScrCreator from './ScrCreator.jsx';

const MainContainer = () => {
  const [showScrCreator, setShow] = useState(false);
  let audioContext = new AudioContext();

  return (
      <main className="MainContainer">
        <button onClick={() => setShow(!showScrCreator)}>
          {showScrCreator ? <i className="fas fa-times"></i> : 'New Scription' }
        </button>
        {showScrCreator && <ScrCreator audioContext={audioContext}/> }
        <Navbar />
        <Feed audioContext={audioContext}/>
      </main>
  );
}

export default MainContainer;
