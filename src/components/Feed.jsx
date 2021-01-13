import React from 'react';
import Scription from './Scription.jsx';

const Feed = () => { 
  // send a get request to query database for scriptions
  // replace <Scription /> below with array of fetched Scriptions

  return (
    <div className="Feed">
      <Scription />
    </div>
  );
}

export default Feed;
