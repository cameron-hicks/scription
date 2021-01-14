const db = require('../models/feedModels');

const feedController = {};
  // TODO: limit # of results

feedController.getScriptions = (req, res, next) => {
  console.log('Getting scriptions...');

  // get all scriptions with their username and song title
  const query = 
  `SELECT s.*, u.username, so.title 
  FROM scriptions s LEFT OUTER JOIN users u
  ON s.user_id = u._id
  LEFT OUTER JOIN songs so
  ON s.song_id = so._id;`;

  db.query(query, (error, response) => {
    if(error) {
      console.log('getScriptions ERROR: ', error);
      return next(error);
    }
    // console.log(response.rows);
    res.locals = response.rows;
    next();
  })
};

feedController.getComments = (req, res, next) => {
  console.log('Getting comments...');

  const { id } = req.query;
  const query = 'SELECT c.* FROM comments c WHERE c.scription_id=' + id;

  db.query(query, (error, response) => {
    if(error) {
      console.log('getComments ERROR: ', error);
      return next(error);
    }

    res.locals = response.rows;
    return next();
  });
};


// mock data showing how to format compiled result of sql queries
  /*
  res.locals = [
    {
      id: 1,
      user_id: 1,  
      username: 'brent',  // left joined via user_id
      timestamp: '2021-01-09 23:54:25-05',
      song_id: 1,
      title: 'Oh, Those Britches Full Of Stitches', // left joined via song_id,
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
  ];
  */


module.exports = feedController;