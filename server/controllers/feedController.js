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
  const query = `SELECT c.*, u.username 
  FROM comments c LEFT OUTER JOIN users u
  ON c.user_id=u._id 
  WHERE c.scription_id=` + id;

  db.query(query, (error, response) => {
    if(error) {
      console.log('getComments ERROR: ', error);
      return next(error);
    }

    res.locals = response.rows;
    return next();
  });
};

feedController.getSong = (req, res, next) => {
  // based on title of incoming scription, get or upsert song record
  // add song's _id to res.locals as song_id
  res.locals.song_id = '2';   // hardcoded for now
  return next();
}

feedController.addScription = (req, res, next) => {
  console.log('Adding new scription to database...', req.body);
  const { user_id, abc } = req.body;
  const { song_id } = res.locals;

  const query = {
    text: 'INSERT INTO scriptions (user_id, song_id, abc) VALUES ($1, $2, $3)',
    values: [user_id, song_id, abc]
  }

  db.query(query, (error, response) => {
    if(error) {
      console.log('getComments ERROR: ', error);
      return next(error);
    }

    return next();
  });
}


module.exports = feedController;