import React from 'react';
// import { useState, useEffect } from 'react';
import Scription from './Scription.jsx';

const Feed = ({audioContext, scriptions}) => { 
// const Feed = ({audioContext}) => { 
  // const [scriptions, setScriptions] = useState([]);
  // const [fetched, setFetched] = useState(false);

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
  //   fetch('/api')
  //     .then(res => res.json())
  //     .then((fetched) => {
  //       if(!fetched.length) fetched = [];

  //       setScriptions(fetched);
  //       setFetched(true);
  //       return;
  //     })
  //     .catch(err => {
  //       console.error('ERROR getting feed: ', err);
  //     });
  // }, [fetched]);

  return (
    <div className="Feed">
      {scriptions.map(scrObj =>
        <Scription key={`Scription#${scrObj._id}`} scrObj={scrObj} audioContext={audioContext}/>
      )}
    </div>
  );
}


export default Feed;
