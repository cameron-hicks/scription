import React from 'react';

const Comments = ({comments}) => {
  return (
    <section>
      {comments.length 
        ? comments.map((comment, i) => {
           return <div key={`Comment#${comment._id}`}>
             <p className="username">
               {comment.username}
               <span className="timestamp">{comment.timestamp}</span>
             </p>
             <p className="comment-text">{comment.text}</p>
           </div>
         }) 
        : <div>Be the first to comment...</div>
      }
    </section>
  )
}

export default Comments;