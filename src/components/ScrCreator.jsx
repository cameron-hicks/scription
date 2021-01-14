import React from 'react';
import { useState, useEffect } from 'react';

const ScrCreator = () => { 
  const [newName, setName] = useState('');
  const [newTitle, setTitle] = useState('');
  const [newGenre, setGenre] = useState('');
  const [newAbc, setAbc] = useState('');
  
  return (
    <div className="ScrCreator">
      <form>
        <input id="username-input" type="text" placeholder="username" onChange={() => setName(this.value)}></input>
        <input id="title-input" type="text" placeholder="song title" onChange={() => setTitle(this.value)}></input>
        <select id="genre-input" defaultValue="" onChange={() => setGenre(this.value)}>
          <option value="" disabled>genre</option>
          <option value="folk">folk</option>
          <option value="pop">pop</option>
          <option value="movie music">movie music</option>
          <option value="other">other</option>
        </select>
        <textarea spellCheck="false" placeholder="Add your transcription in ABC notation..." onChange={() => setAbc(this.value)}></textarea>
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
