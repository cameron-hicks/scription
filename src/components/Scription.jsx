import React from 'react';
import { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import ABCJS from 'abcjs';
import 'abcjs/abcjs-audio.css';     // playback widget

const USER_ID = 6;

const Scription = ({ scrObj, audioContext }) => { 
  const [tuneRendered, setTuneRendered ] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsFetched, setFetched] = useState(false);
  const [newCommentSubmitted, setCommentSubmitted] = useState(false);
  const [liked, setLiked] = useState(false);    // whether logged-in user has liked it
  const [likes, setLikes] = useState(0);    // total likes it has

  
  useEffect(() => {
    const fetchComments = () => {
      const queryString = `/api/comments?id=${scrObj._id}`;
      fetch(queryString)
      .then(res => res.json())
      .then((fetched) => {
        if(!fetched.length) fetched = [];
  
        setComments(fetched);
        // setFetched(true);
        return;
      })
      .catch(err => console.log('Scription GET comments ERROR: ', err));
    };
    
    // fetch total likes and whether current user has liked it
    const fetchLikes = () => {
      const queryString = `/api/likes?id=${scrObj._id}&user_id=` + USER_ID;
      fetch(queryString)
      .then(res => res.json())
      .then((fetched) => {
        // console.log('result of getting likes at scription # ', scrObj._id, fetched);
        setLikes(fetched.count);
        setLiked(fetched.likedByUser);
        return;
      })
      .catch(err => console.log('Scription GET likes ERROR: ', err));
    };
  
    const setUpAbc = () => {
      const visualObj = ABCJS.renderAbc(
        `TuneId#${scrObj._id}`, 
        scrObj.abc, 
        { responsive: 'resize' }
      );
      const synth = new ABCJS.synth.CreateSynth();
      const widget = new ABCJS.synth.SynthController();
  
      // display playback widget
      widget.load(`#widget${scrObj._id}` || '', null, { displayPlay: true, displayProgress: true });
  
      // load notes listed in ABC string
      synth.init({
        audioContext,
        visualObj: visualObj[0],
      }).then((results) => {
          widget.setTune(visualObj[0], false, {})
                .then(() => {
                  // console.log("Audio successfully loaded.");
                }).catch(function (error) {
                  console.warn("Problem initiating playback:", error);
                });
      }).catch((error) => {
          console.warn('Problem buffering audio: ', error);
      });
    }

    fetchComments();
    fetchLikes();
    setUpAbc();

    // set new comment flag to false
    setCommentSubmitted(false);
    return setTuneRendered(true); // do I need this?
  }, [tuneRendered, commentsFetched, scrObj._id, scrObj.abc, newCommentSubmitted, likes, liked, audioContext]);

  const addLike = () => {
    fetch('/api/likes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        user_id: USER_ID,           // hard-coded for now
        scription_id: scrObj._id
      })
    })
    .then(data => {
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
      <div id={`widget${scrObj._id}`}></div>

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
      <section>    
        {mappedComments}
      </section>
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
