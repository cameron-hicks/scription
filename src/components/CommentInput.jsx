import React from 'react';
import { useState } from 'react';

const CommentInput = ({scription_id, addComment}) => {
  const [newComment, setComment] = useState('');

  const submit = () => {
    // optimistically updating <Scription/>
    addComment(newComment);

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
      setComment('');
    })
    .catch(error => {
      alert('Something went wrong...');
      console.error('ERROR submitting comment: ', error)
    });
  }

  return (
    <div id="CommentInput">
      <textarea placeholder="Comment..."
        value={newComment}
        onChange={(event) => {
          setComment(event.target.value)
        }}>
      </textarea>
      <button className="scription-btns" onClick={submit}>
        Send <i className="fas fa-share-square"></i>
      </button>
    </div>
  );
};

export default CommentInput;