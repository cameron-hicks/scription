import React from 'react';
import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

const Scription = ({ scrObj }) => { 
  const [tuneRendered, setTuneRendered ] = useState(false);

  // TODO: turn this into a separate React component and give each one a key
  const mappedComments = scrObj.comments.map( comment => {
    return <div>
      <p className="username">
        {comment.user.username}
        <span className="timestamp">{comment.timestamp}</span>
      </p>
      <p className="comment-text">{comment.text}</p>
    </div>
  });


  //invoke ABCJS.renderAbc AFTER the component has mounted/updated
  useEffect(() => {
    const tuneArr = ABCJS.renderAbc(
      `TuneId#${scrObj.id}`, 
      scrObj.abc, 
      {
        responsive: 'resize'
      }
    );
    console.log(tuneArr);
    setTuneRendered(true);
  }, [tuneRendered]);


  return (
    <div className="Scription">
      <p className="username">
        {scrObj.user.username}
        <span className="timestamp">{scrObj.timestamp}</span>
      </p>
      <div id={`TuneId#${scrObj.id}`}></div>
      <div>Likes: {scrObj.likes}</div>
      <div className="Scription-comments">{mappedComments}</div>
    </div>
  );
}


// TODO: function to format timestamp strings by splitting into an array, reordering the elements, and re-joining them in a nicer readable format
  // TODO if time: compare timestamp to Date.now and print "today, yesterday, two days ago", etc.


export default Scription;
