const cookieParser = require('cookie-parser');
// connect to database
const { Pool } = require('pg');
const { PG_URI } = require('../secrets.js');
const db = new Pool({
  connectionString: PG_URI
});

const feedController = {};
  // TODO: limit # of results

feedController.getScriptions = (req, res, next) => {
  console.log('Getting scriptions...');

  // get all scriptions with their username and song title
  const query = 
  `SELECT s._id, s.user_id, s.abc, to_char(s.timestamp, 'Mon FMDDth, YYYY at HH12:MIpm') AS timestamp, u.username, so.title
  FROM scriptions s LEFT OUTER JOIN users u
  ON s.user_id = u._id
  LEFT OUTER JOIN songs so
  ON s.song_id = so._id
  ORDER BY s.timestamp ASC;`;

  db.query(query, (error, response) => {
    if(error) {
      console.log('getScriptions ERROR: ', error);
      return next(error);
    }

    res.locals = response.rows;
    next();
  })
};

feedController.getComments = (req, res, next) => {
  // console.log('Getting comments...');

  const { id } = req.query;
  const query = 
  `SELECT c._id, c.text, to_char(c.timestamp, 'Mon FMDDth, YYYY at HH12:MIpm') AS timestamp, u.username 
  FROM comments c LEFT OUTER JOIN users u
  ON c.user_id=u._id 
  WHERE c.scription_id=` + id +
  `ORDER BY c.timestamp ASC`;

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
  res.locals.song_id = null;   // hardcoded for now
  return next();
}

feedController.addScription = (req, res, next) => {
  console.log('Adding new scription to database...', req.body);
  const userID = cookieParser.signedCookie(req.signedCookies.userID, COOKIE_SIG);
  const { abc } = req.body;
  const { song_id } = res.locals;

  const query = {
    text: 'INSERT INTO scriptions (user_id, song_id, abc) VALUES ($1, $2, $3)',
    values: [userID, song_id, abc]
  }

  db.query(query, (error, response) => {
    if(error) {
      console.log('addScription ERROR: ', error);
      return next(error);
    }

    return next();
  });
};

feedController.addComment = (req, res, next) => {
  // console.log('Adding new comment to database...', req.body);
  const userID = cookieParser.signedCookie(req.signedCookies.userID, COOKIE_SIG);
  const { scription_id, text } = req.body;

  const query = {
    text: 'INSERT INTO comments (user_id, scription_id, text) VALUES ($1, $2, $3)',
    values: [userID, scription_id, text]
  }

  db.query(query, (error, response) => {
    if(error) {
      console.log('addComment ERROR: ', error);
      return next(error);
    }

    return next();
  });
};

// TODO: Can this be combined with the getScriptions query? Perhaps using a subquery?
feedController.getLikes = (req, res, next) => {
  const userID = cookieParser.signedCookie(req.signedCookies.userID, COOKIE_SIG);
  // console.log('Getting likes...', req.query);

  let { id } = req.query;
  // user_id = user_id - 0;  // type coerce to number
  console.log('Getting likes for user ', userID);

  const query = 
  `SELECT *
  FROM likes
  WHERE scription_id=` + id;

  db.query(query, (error, response) => {
    if(error) {
      console.log('getLikes ERROR: ', error);
      return next(error);
    }
    // console.log('likes: ', response.rows);
    const count = response.rowCount;
    const likedByUser = response.rows.reduce((accm, curr) => curr.user_id === userID, false);

    res.locals = {
      count,
      likedByUser
    };
    return next();
  });
};

feedController.addLike = (req, res, next) => {
  const userID = cookieParser.signedCookie(req.signedCookies.userID, COOKIE_SIG);
  // console.log('Adding new like to database...', req.body);
  let { scription_id } = req.body;
  // scription_id = scription_id - 0;  // type coerce to number

  const query = {
    text: 'INSERT INTO likes (user_id, scription_id) VALUES ($1, $2)',
    values: [userID, scription_id]
  }

  db.query(query, (error, response) => {
    if(error) {
      console.log('addLike ERROR: ', error);
      return next(error);
    }

    return next();
  });
};

module.exports = feedController;