import React from 'react';
import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

const ScrCreator = () => { 
  const [newName, setName] = useState('');
  const [newTitle, setTitle] = useState('');
  const [newGenre, setGenre] = useState('');
  const [newAbc, setAbc] = useState('');
  const [previewRendered, setRendered ] = useState(false);

  useEffect(() => {
    //invoke ABCJS.renderAbc AFTER the component has mounted/updated
    ABCJS.renderAbc('preview', newAbc, { responsive: 'resize' });
    return setRendered(true);
  }, [previewRendered, newAbc]);

  
  return (
    <div className="ScrCreator">
      <form>
        <input id="username-input" type="text" placeholder="username" onChange={(event) => setName(event.target.value)}></input>
        <input id="title-input" type="text" placeholder="song title" onChange={(event) => setTitle(event.target.value)}></input>
        <select id="genre-input" defaultValue="" onChange={(event) => setGenre(event.target.value)}>
          <option value="" disabled>genre</option>
          <option value="folk">folk</option>
          <option value="pop">pop</option>
          <option value="movie music">movie music</option>
          <option value="other">other</option>
        </select>

        <textarea spellCheck="false" 
          placeholder="Add your transcription in ABC notation..." 
          onChange={(event) => {
            setAbc(event.target.value);
            setRendered(false);
          }}
        >
        </textarea>
        <div id="preview"></div>

        <div className="right-align-btns">
          <button onClick={() => console.log(newName, newTitle, newGenre, newAbc)}>
            post <i className="fas fa-share-square"></i>
          </button>
        </div>
      </form>
    </div>
  );
}


export default ScrCreator;
