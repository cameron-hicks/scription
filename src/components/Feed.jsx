import React from 'react';
import { useState, useEffect } from 'react';
import Scription from './Scription.jsx';

const Feed = ({audioContext}) => { 
  console.log('Rendering Feed');
  const [scriptions, setScriptions] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then((fetched) => {
        if(!fetched.length) fetched = [];

        setScriptions(fetched);
        return;
      })
      .catch(err => {
        console.error('ERROR getting feed: ', err);
      });
  }, []);

  return (
    <div className="Feed">
      {scriptions.map(scrObj =>
        <Scription key={`Scription#${scrObj._id}`} scrObj={scrObj} />
      )}
    </div>
  );
}

export default Feed;

// use this as an idea for applying filters to the feed
  /*
  const myScriptions = useMemo(() => scriptions.filter(s => s.userId === self.id), [scriptions])
  const letTheUserKnow = () => {
    toast({title: `HEY YOU HAVE ${myScriptions.length} NEW DATA LOOK`});
  }
  useEffect(() => {
    letTheUserKnow()
  }, [myScriptions, letTheUserKnow])
  */