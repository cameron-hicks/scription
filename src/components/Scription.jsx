import React from 'react';
import { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import ABCJS from 'abcjs';

const USER_ID = 1;

const Scription = ({ scrObj }) => { 
  const [tuneRendered, setTuneRendered ] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsFetched, setFetched] = useState(false);
  const [newCommentSubmitted, setCommentSubmitted] = useState(false);
  const [liked, setLiked] = useState(false);    // whether logged-in user has liked it
  const [likes, setLikes] = useState(0);    // total likes it has
  
  useEffect(() => {
    // fetch comments and likes every time this scription re-renders
    const queryString = `/api/comments?id=${scrObj._id}`;
    fetch(queryString)
    .then(res => res.json())
    .then((fetched) => {
      if(!fetched.length) fetched = [];

      setComments(fetched);
      setFetched(true);
      return;
    })
    .catch(err => console.log('Scription GET comments ERROR: ', err));

    // setFetched(false);    // do I even need this piece of state anymore?
    // TODO: fetch likes within useEffect without infinite loop

    //invoke ABCJS.renderAbc AFTER the component has mounted/updated
    ABCJS.renderAbc(
      `TuneId#${scrObj._id}`, 
      scrObj.abc, 
      { responsive: 'resize' }
    );

    // set new comment flag to false
    setCommentSubmitted(false);
    return setTuneRendered(true);
  }, [tuneRendered, commentsFetched, scrObj._id, scrObj.abc, newCommentSubmitted]);

  // fetch total likes and whether current user has liked it
  const queryString = `/api/likes?id=${scrObj._id}&user_id=` + USER_ID;
  fetch(queryString)
  .then(res => res.json())
  .then((fetched) => {
    console.log(fetched);
    setLikes(fetched.count);
    setLiked(fetched.likedByUser);
    return;
  })
  .catch(err => console.log('Scription GET likes ERROR: ', err));

  const addLike = () => {
    console.log('Adding like from Scription.jsx.');

    fetch('/api/likes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        user_id: 1,           // hard-coded for now
        scription_id: scrObj._id
      })
    })
    .then(data => {
      console.log('Successful like: ', data);
      setLiked(true);
    })
    .catch(error => console.log('Scription addLike ERROR: ', error));
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
        <span>Likes: {likes}</span>
        <button className={liked ? "liked scription-btns" : "scription-btns"}
          onClick={() => {
            if(!liked) addLike();
            return;
          }}>
            {liked ?  <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
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
