import React from 'react';
import { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import ABCJS from 'abcjs';

const Scription = ({ scrObj }) => { 
  const [tuneRendered, setTuneRendered ] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsFetched, setFetched] = useState(false);
  const [newCommentSubmitted, setCommentSubmitted] = useState(false);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    // fetch comments every time this scription re-renders
    let queryString = `/api/comments?id=${scrObj._id}`;
    fetch(queryString)
    .then(res => res.json())
    .then((fetched) => {
      if(!fetched.length) fetched = [];

      setComments(fetched);
      setFetched(true);
      return;
    })
    .catch(err => console.log('Scription.useEffect ERROR: ', err));

    setFetched(false);    // do I even need this piece of state anymore?

    // fetch liked status
    queryString = `/api/liked?id=${scrObj._id}`;
    fetch(queryString)
    .then(res => res.json())
    .then((fetched) => {
      if(!fetched) fetched = false;

      setLiked(fetched);
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

    // set new comment flag to false
    setCommentSubmitted(false);
    return setTuneRendered(true);
  }, [tuneRendered, commentsFetched, scrObj._id, scrObj.abc, newCommentSubmitted]);

  const addLike = () => {

  }

  const mappedComments = comments.length ? 
    comments.map((comment, i) => {
      return <div key={`Scr#${scrObj._id}Comment#${i}`}>
        <p className="username">
          {comment.username}
          <span className="timestamp">{comment.timestamp}</span>
        </p>
        <p className="comment-text">{comment.text}</p>
      </div>
    }) :
    <div>Be the first to comment...</div>;

  return (
    <div className="Scription">
      <div>
        <p className="username">
          {scrObj.username}
          <span className="timestamp">{scrObj.timestamp}</span>
        </p>
      </div>
      <div id={`TuneId#${scrObj._id}`}></div>
      <div className='Scription-likes'>
        <span>Likes: {scrObj.likes || 0}</span>
        <button className={liked ? "liked scription-btns" : "scription-btns"}
          onClick={addLike}>
            Like
          </button>
      </div>
      <div className="Scription-comments">    
        {mappedComments}
      </div>
      <CommentInput 
        scription_id={scrObj._id} 
        setSubmitted={setCommentSubmitted}
      />
    </div>
  );
}


// TODO: function to format timestamp strings by splitting into an array, reordering the elements, and re-joining them in a nicer readable format
  // TODO if time: compare timestamp to Date.now and print "today, yesterday, two days ago", etc.


export default Scription;
