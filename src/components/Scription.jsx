import React from 'react';
import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

const Scription = ({ scrObj }) => { 
  const [tuneRendered, setTuneRendered ] = useState(false);
  // console.log('scrObj.comments: ', scrObj.comments);
  const [comments, setComments] = useState([]);
  const [commentsFetched, setFetched] = useState(false);

  // TODO: turn this into a separate React component and give each one a key
  const mappedComments = comments.map(comment => {
      return <div>
        <p className="username">
          {comment.username}
          <span className="timestamp">{comment.timestamp}</span>
        </p>
        <p className="comment-text">{comment.text}</p>
      </div>
    });
  
  useEffect(() => {
    // console.log('scrObj._id: ', scrObj._id);
    // fetch comments on this scription
    const queryString = `?id=${scrObj._id}`;
    fetch('/api/comments' + queryString, {
      method: 'GET',
    })
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
      `TuneId#${scrObj.id}`, 
      scrObj.abc, 
      {
        responsive: 'resize'
      }
    );
    return setTuneRendered(true);
  }, [tuneRendered, commentsFetched]);


  return (
    <div className="Scription">
      <p className="username">
        {scrObj.username}
        <span className="timestamp">{scrObj.timestamp}</span>
      </p>
      <div id={`TuneId#${scrObj.id}`}></div>
      <div>
        <span>Likes: {scrObj.likes}</span>
        <button>Like</button>
      </div>
      <div className="Scription-comments">{mappedComments.length ? mappedComments : 'Be the first to comment...'}</div>
    </div>
  );
}


// TODO: function to format timestamp strings by splitting into an array, reordering the elements, and re-joining them in a nicer readable format
  // TODO if time: compare timestamp to Date.now and print "today, yesterday, two days ago", etc.


export default Scription;
