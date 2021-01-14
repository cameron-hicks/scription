import React from 'react';
import { useState, useEffect } from 'react';

const CommentInput = () => {
  const [newComment, setComment] = useState('');

  const submit = () => {
    fetch('/api/comments/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        user_id: 4,           // hard-coded for now
        scription_id: 2,
        text: newComment
      })
    })
    .then(res => res.json())
    .then(data => console.log('Data from PUT response: ', data))
    .catch(error => console.log('ScrCreator ERROR: ', error));
  }

  return (
    <div id="CommentInput">
      <textarea placeholder="Comment..."
        onChange={(event) => {
          setComment(event.target.value);
        }}>
      </textarea>
      {/* <div className="right-align-btns scription-btns"> */}
        <button className="scription-btns" onClick={submit}>
          Send <i className="fas fa-share-square"></i>
        </button>
      {/* </div> */}
    </div>
  );
};

export default CommentInput;