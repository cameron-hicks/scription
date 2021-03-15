import React from 'react';
import { useState, useEffect } from 'react';
import useABCJS from '../hooks/useABCJS';
import Comments from './Comments';
import CommentInput from './CommentInput';

const Scription = ({ scrObj }) => { 
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false); // whether logged-in user has liked it
  const [likes, setLikes] = useState(0); 

  const fetchComments = (id) => {
    const queryString = `/api/comments?id=${id}`;
    fetch(queryString)
    .then(res => res.json())
    .then((data) => {
      if(!data.length) data = [];
  
      setComments(data);
      return;
    })
    .catch(err => console.error('ERROR getting comments: ', err));
  };
  
  const fetchLikes = (id) => {
    const queryString = `/api/likes?scription_id=${id}`;
    fetch(queryString)
    .then(res => res.json())
    .then((data) => {
      setLikes(data.count);
      setLiked(data.likedByUser);
      return;
    })
    .catch(err => console.error('ERROR getting likes: ', err));
  };

  const addLike = (id) => {
    // optimistically updating
    setLiked(true);
  
    fetch('/api/likes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({
        scription_id: id
      })
    })
    .then(data => {
    })
    .catch(error => {
      setLiked(false);
      console.log('Scription addLike ERROR: ', error);
    });
  }

  useEffect(() => {
    fetchComments(scrObj._id);
    fetchLikes(scrObj._id);
  }, []);
  
  useABCJS(scrObj._id, scrObj.abc);


  return (
    <div className="Scription">
      <div>
        <p className="username">
          {scrObj.username}
          <span className="timestamp">{scrObj.timestamp}</span>
        </p>
      </div>
      <div id={`TuneId#${scrObj._id}`}></div>
      <div id={`widget${scrObj._id}`}></div>

      <div className='Scription-likes'>
        <span>Likes: {likes}</span>
        <button className={liked ? "liked scription-btns" : "scription-btns"}
          onClick={() => {
            if(!liked) addLike(scrObj._id);
            return;
          }}>
            {liked ?  <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
          </button>
      </div>
      <Comments comments={comments}/>
      <CommentInput 
        scription_id={scrObj._id} 
        addComment={(comment) => setComments([...comments, comment])}
      />
    </div>
  );
}

export default Scription;
