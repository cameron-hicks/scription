import React from 'react';
import { useState, useEffect } from 'react';
import Scription from './Scription.jsx';

const Feed = () => { 
  const [scriptions, setScriptions] = useState([]);
  const [fetched, setFetched] = useState(false);

  // send a get request to query database for scriptions; 
  // TODO: limit # of results
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then((fetched) => {
        if(!fetched.length) fetched = [];

        setScriptions(fetched);
        setFetched(true);
        return;
      })
      .catch(err => console.log('Feed.useEffect ERROR: ', err));
  }, [fetched]);

  const mappedScriptions = scriptions.map(scrObj =>
    <Scription key={`Scription#{scrObj.id}`} scrObj={scrObj}/>
  );

  return (
    <div className="Feed">
      {mappedScriptions}
    </div>
  );
}

/*
// mock data to see the component render before fetch request is done
  const scrObj = {
    id: 1,
    user: {   // joined via user_id
      id: 1,
      username: 'brent'
    },
    timestamp: '2021-01-09 23:54:25-05',
    song: {   // joined via song_id
      id: 1,
      title: 'Oh, Those Britches Full Of Stitches',
      genre: 'folk'
    },
    abc: `X: 7
T:Oh, Those Britches Full Of Stitches
M:2/4
L:1/8
R:Polka
K:A
A>B cA|BA cA|A>B cA|BA F2|
A>B cA|BA ce|A>B AF|FE E2:|
|:e>f ec|BA Bc|e>f ec|BA F2|
e>f ec|BA ce|A>B AF|FE E2:|`,
    likes: 10,    // count of # of rows joined from likes table via their scription_id     
    comments: [   // rows from comments table joined via their scription_id
      {   
        id: 1,
        user: {   // joined via user_id
          id: 2,
          username: 'furiousfiddler'
        },
        timestamp: '2021-01-09 23:57:25-05',
        text: `This is great, thank you!`
      },
      {
        id: 2,
        user: {  
          id: 3,
          username: 'doglover123'
        },
        timestamp: '2021-01-09 23:58:25-05',
        text: `lol that title is hilarious`
      },
      {
        id: 3,
        user: {  
          id: 4,
          username: 'chronicsplainer'
        },
        timestamp: '2021-01-09 23:59:25-05',
        text: `I think the first note in the third measure might be wrong.`
      }
    ]
  }
*/



export default Feed;
