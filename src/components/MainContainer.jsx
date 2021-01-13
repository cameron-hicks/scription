import React from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';

const MainContainer = () => {
  // useState hooks here

  return (
    <div>
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
    <footer>
      <p>Created by Cameron Baumgartner | <a href="https://github.com/cameronbaumgartner">Github</a> | <a href="https://linkedin.com/in/cameronbaumgartner">LinkedIn</a></p>
    </footer> 
    </div>
  );
}

export default MainContainer;
