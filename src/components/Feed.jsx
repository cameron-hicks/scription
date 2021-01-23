import React from 'react';
import { useState, useEffect } from 'react';
import Scription from './Scription.jsx';

const Feed = ({myContext, scriptions}) => { 

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

  return (
    <div className="Feed">
      {scriptions.map(scrObj =>
        <Scription key={`Scription#${scrObj._id}`} scrObj={scrObj} myContext={myContext}/>
      )}
    </div>
  );
}


export default Feed;
