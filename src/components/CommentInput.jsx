import React from 'react';
import { useState } from 'react';

const CommentInput = ({scription_id, setSubmitted}) => {
  const [newComment, setComment] = useState('');

  const submit = () => {
    fetch('/api/comments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        user_id: 1,           // hard-coded for now
        scription_id,
        text: newComment
      })
    })
    .then(data => {
      // console.log('Successful comment submission: ', data);
      setComment('');
      setSubmitted(true);
    })
    .catch(error => console.log('CommentInput ERROR: ', error));
  }

  return (
    <div id="CommentInput">
      <textarea placeholder="Comment..."
        value={newComment}
        onChange={(event) => {
          console.log('event: ', event.target.value);
          setComment(event.target.value)
          console.log('newComment: ', newComment);
        }}>
      </textarea>
      <button className="scription-btns" onClick={submit}>
        Send <i className="fas fa-share-square"></i>
      </button>
    </div>
  );
};

export default CommentInput;