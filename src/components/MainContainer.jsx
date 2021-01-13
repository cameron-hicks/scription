import React from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';

const MainContainer = () => {
  // useState hooks here

  return (
    <div className="MainContainer">
      <header className="MainContainer-header">
        <h1>Scription</h1>
      </header>
      <div className="MainContainer-btns">
        <button>New Scription</button>
      </div>
      <div className="MainContainer-content">
        <Navbar />
        <Feed />
      </div>
    </div>
  );
}

export default MainContainer;
