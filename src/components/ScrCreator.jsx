import React from 'react';
import { useState, useEffect, useCallback, useContext } from 'react';
import ABCJS from '../vendor/abcjs/abcjs-basic-min';
import '../vendor/abcjs/abcjs-audio.css';   // playback widget styles
import AudioContextContext from '../hooks/AudioContext';

const PREVIEW_ID = "preview"

const ScrCreator = ({onCreate}) => { 
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
  const audioContext = useContext(AudioContextContext);

  useEffect(() => {
    //invoke ABCJS.renderAbc AFTER the component has mounted/updated
    if (newAbc) {
      // TODO: wrap the below in a named function, maybe a custom hook
      const abcOptions = { responsive: 'resize' };
      const visualObj = ABCJS.renderAbc(PREVIEW_ID, newAbc, abcOptions);
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
  }, [newAbc, audioContext]);
  //   return setRendered(true);
  // }, [previewRendered, newAbc, audioContext]);

  const create = useCallback(() => {
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
    .then(data => {
      console.log('Data from PUT response: ', data)
      onCreate();
    })
    .catch(error => console.log('ScrCreator ERROR: ', error));
  }, [])

// before
    // .then(res => res.json())
    // .then(data => console.log('Data from PUT response: ', data))
  //   .catch(error => {
  //     alert('Something went wrong...');
  //     console.error('ERROR creating scription: ', error);
  //   });
  // }
  
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
          }}> 
        </textarea>
        <a className="right-align" href="https://www.biteyourownelbow.com/abcnotation.htm" target="_blank" rel="noopener noreferrer"><small>(Click here for an explanation of ABC notation.)</small></a>
        <div id={PREVIEW_ID}></div>
        {/* <div id="errors"></div> */}
        <div id="widget"></div>

        <div className="right-align scription-btns">
          <button onClick={create}>
            post <i className="fas fa-share-square"></i>
          </button>
        </div>
      </form>
    </div>
  );
}


export default ScrCreator;
