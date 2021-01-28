const { Pool } = require('pg');
const { DB_URI, COOKIE_SIG } = require('../secrets.js');

const db = new Pool({
  connectionString: DB_URI
});

const authController = (req, res, next) => {
  const addUser = () => {
    const { username, password, birthdate } = req.body;
    const crypt = 'Hi I\'ve been bcrypted';   // TODO
    // query. TODO: check syntax for returning a value from insert operation
    // also TODO: how to check for uniqueness within the same query
    const query = 'INSERT INTO users (username, password, birthdate) VALUES ($1, $2, $3) RETURNING _id';
  
    db.query(query, (err, result) => {
      if (err) {
        console.warn('ERROR at addUser: ', err);
        return next(err);
      }
      res.locals.userID = result._id;
      return next();
    })
  };

  const attemptLogin = () => {
    const { username, password } = req.body;
    const crypt = 'Hi I\'ve been bcrypted';   // TODO

    const query = {
      text: 'SELECT _id FROM users WHERE username = $1 AND password = $2',
      values: [username, crypt]
    };
    db.query(query, (err, result) => {
      if (err) {
        console.warn('ERROR at attemptLogin: ', err);
        return next(err);
      }
      
      if (result === null) {
        // if no user found with that name and pass, send 401
        return res.status(401).json({ status: 'Unsuccessful login' });
      }

      res.locals.userID = result._id;
      return next();
    })
  };

  const setCookie = () => {
    const { userID } = res.locals;
  
    res.cookie('userID', userID, { 
      httpOnly: true, 
      maxAge: 234859550,   // 3 days in ms
      sameSite: true,
      secure: true,
      signed: true
    });
  
    return next();
  };

  return {
    addUser,
    attemptLogin,
    setCookie
  }
};

module.exports = authController;