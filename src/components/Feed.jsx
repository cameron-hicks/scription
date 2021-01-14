import React from 'react';
import { useState, useEffect } from 'react';
import Scription from './Scription.jsx';

const Feed = () => { 
  const [scriptions, setScriptions] = useState([]);
  const [fetched, setFetched] = useState(false);

  // send a get request to query database for scriptions; 
  // TODO: limit # of results
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then((fetched) => {
        if(!fetched.length) fetched = [];

        setScriptions(fetched);
        setFetched(true);
        return;
      })
      .catch(err => console.log('Feed.useEffect ERROR: ', err));
  }, [fetched]);

  const mappedScriptions = scriptions.map(scrObj =>
    <Scription key={`Scription#${scrObj._id}`} scrObj={scrObj}/>
  );

  return (
    <div className="Feed">
      {mappedScriptions}
    </div>
  );
}


export default Feed;
