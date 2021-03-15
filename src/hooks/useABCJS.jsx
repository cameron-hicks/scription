import React, {useContext, useEffect} from 'react';
import AudioContextContext from './AudioContext';
import ABCJS from '../vendor/abcjs/abcjs-basic-min';

export const useABCJS = (id, abc) => {
  const audioContext = useContext(AudioContextContext);

  useEffect(() => {
    const visualObj = ABCJS.renderAbc(
      `TuneId#${id}`, 
      abc, 
      { responsive: 'resize' }
    );
    const synth = new ABCJS.synth.CreateSynth();
    const widget = new ABCJS.synth.SynthController();
  
    // display playback widget
    widget.load(`#widget${id}` || '', null, { displayPlay: true, displayProgress: true });
  
    // load notes listed in ABC string
    synth.init({
      audioContext,
      visualObj: visualObj[0],
    }).then((results) => {
        widget.setTune(visualObj[0], false, {})
              .catch(function (error) {
                console.warn("Problem initiating playback:", error);
              });
    }).catch((error) => {
        console.warn('Problem buffering audio: ', error);
    });
  }, []);
  
}

export default useABCJS;