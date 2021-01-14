import React from 'react';
import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

const Scription = ({ scrObj }) => { 
  const [tuneRendered, setTuneRendered ] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsFetched, setFetched] = useState(false);
  
  useEffect(() => {
    // fetch comments on this scription
    const queryString = `/api/comments?id=${scrObj._id}`;
    fetch(queryString)
    .then(res => res.json())
    .then((fetched) => {
      if(!fetched.length) fetched = [];

      setComments(fetched);
      setFetched(true);
      return;
    })
    .catch(err => console.log('Scription.useEffect ERROR: ', err));

    //invoke ABCJS.renderAbc AFTER the component has mounted/updated
    ABCJS.renderAbc(
      `TuneId#${scrObj._id}`, 
      scrObj.abc, 
      {
        responsive: 'resize'
      }
    );
    return setTuneRendered(true);
  }, [tuneRendered, commentsFetched]);


  const mappedComments = comments.map((comment, i) => {
    return <div key={`Scr#${scrObj._id}Comment#${i}`}>
      <p className="username">
        {comment.username}
        <span className="timestamp">{comment.timestamp}</span>
      </p>
      <p className="comment-text">{comment.text}</p>
    </div>
  });

  return (
    <div className="Scription">
      <p className="username">
        {scrObj.username}
        <span className="timestamp">{scrObj.timestamp}</span>
      </p>
      <div id={`TuneId#${scrObj._id}`}></div>
      <div className='Scription-likes'>
        <span>Likes: {scrObj.likes || 0}</span>
        <button>Like</button>
      </div>
      <div className="Scription-comments">{mappedComments.length ? mappedComments : 'Be the first to comment...'}</div>
    </div>
  );
}


// TODO: function to format timestamp strings by splitting into an array, reordering the elements, and re-joining them in a nicer readable format
  // TODO if time: compare timestamp to Date.now and print "today, yesterday, two days ago", etc.


export default Scription;
