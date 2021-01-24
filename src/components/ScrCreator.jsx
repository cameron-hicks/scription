import React from 'react';
import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';
import 'abcjs/abcjs-audio.css';   // playback widget


// assume user is logged in and their id is cached; no need to collect it
const ScrCreator = ({audioContext}) => { 
  const [newTitle, setTitle] = useState('');
  const [newGenre, setGenre] = useState('');
  const [newAbc, setAbc] = useState(
`T: Title
M: Meter, e.g. 4/4
L: 1/4
K: Key, e.g. "A" for A major or "Am" for A minor
C: Composer or artist
Q: Beats per minute (optional)
R: Rhythm (optional)
G, A, B, C | D E F G | A B c d | e f g a | b c' d' e' | f'2 g'2 ||
G,3 z | A, B, C2 | D4 |E1/2F1/2 G1/2A1/2 A1/2G1/2 F1/2E1/2 | B c d e1/4f1/4g1/4a1/4 | b c' d' e' | f'2 g'2 |]`);
  const [previewRendered, setRendered ] = useState(false);

  useEffect(() => {
    //invoke ABCJS.renderAbc AFTER the component has mounted/updated
    if (newAbc) {
      const visualObj = ABCJS.renderAbc('preview', newAbc, { responsive: 'resize' });
      const synth = new ABCJS.synth.CreateSynth();
      const widget = new ABCJS.synth.SynthController();

      // display playback widget
      widget.load('#widget', null, { displayPlay: true, displayProgress: true });

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
    return setRendered(true);
  }, [previewRendered, newAbc, audioContext]);

  const create = () => {
    console.log('Creating new scription');

    fetch('/api/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        title: newTitle,
        genre: newGenre,
        abc: newAbc
      })
    })
    .then(res => res.json())
    .then(data => console.log('Data from PUT response: ', data))
    .catch(error => console.log('ScrCreator ERROR: ', error));
  }
  
  return (
    <div className="ScrCreator">
      <form>
        <input id="title-input" type="text" value={newTitle} placeholder="song title" onChange={(event) => setTitle(event.target.value)} required></input>
        <select id="genre-input" defaultValue="" onChange={(event) => setGenre(event.target.value)}>
          <option value="" disabled>genre</option>
          <option value="folk">folk</option>
          <option value="pop">pop</option>
          <option value="movie music">movie music</option>
          <option value="other">other</option>
        </select>

        <textarea spellCheck="false" 
          value={newAbc}
          onChange={(event) => {
            setAbc(event.target.value);
            setRendered(false);
          }}> 
        </textarea>
        <a className="right-align-btns" href="https://www.biteyourownelbow.com/abcnotation.htm" target="_blank" rel="noopener noreferrer"><small>(Click here for an explanation of ABC notation.)</small></a>
        <div id="preview"></div>
        {/* <div id="errors"></div> */}
        <div id="widget"></div>

        <div className="right-align-btns scription-btns">
          <button onClick={create}>
            post <i className="fas fa-share-square"></i>
          </button>
        </div>
      </form>
    </div>
  );
}


export default ScrCreator;
