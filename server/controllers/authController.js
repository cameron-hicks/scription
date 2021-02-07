const bcrypt = require('bcrypt');
const db = require('../model');
const cookieParser = require('cookie-parser');
const { COOKIE_SIG } = require('../secrets.js');

const authController = {};

authController.checkUniqueness = (req, res, next) => {
  const {username} = req.body;

  const query = {
    text: 'SELECT username FROM users WHERE username=$1',
    values: [username],
  };

  db.query(query, (err, result) => {
    if (result.rows.length) {
      return res.status(401).json({message: 'An account with that username already exists.'});
    }
    return next();
  });
}

authController.addUser = (req, res, next) => {
;  const { username, password, birthdate } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if(err) {
      console.error('ERROR encrypting password: ', err);
      return next(err);
    }

    const query = {
      text: 'INSERT INTO users (username, password, birthdate) VALUES ($1, $2, $3) RETURNING _id',
      values: [username, hash, birthdate]
    };

    db.query(query, (err, result) => {
      if (err) {
        console.warn('ERROR at addUser: ', err);
        return next(err);
      }
      console.log('result of AddUser query:', result.rows[0]);
      res.locals.userID = result.rows[0]._id;
      return next();
    })
  })  
};

authController.attemptLogin = (req, res, next) => {
  const { username, password } = req.body;

  const query = {
    text: 'SELECT _id, password FROM users WHERE username = $1',
    values: [username]
  };

  db.query(query, (err, result) => {
    if (err) {
      console.warn('ERROR at attemptLogin: ', err);
      return next(err);
    }
    
    if (!result.rows.length) {
      // if no user found with that name and pass, send 401
      return res.status(401).json({ status: 'No such user' });
    }

    bcrypt.compare(password, result.rows[0].password, (err, authenticated) => {
      if (err) {
        console.error('ERROR at bcrypt.compare:', err);
        return next(err);
      }

      if (!authenticated) {
        return res.status(401).json({ message: 'Incorrect password.' });
      }

      res.locals.userID = result.rows[0]._id;
      return next();
    });
  })
};

authController.setCookie = (req, res, next) => {
  const { userID } = res.locals;
  console.log('Setting cookie for user ', userID);

  res.cookie('userID', userID, { 
    httpOnly: true, 
    maxAge: 234859550,   // 3 days
    sameSite: true,
    secure: true,
    signed: true
  });

  return next();
};

authController.setCookie = (req, res, next) => {
  const { userID } = res.locals;
  console.log('Setting cookie for user ', userID);

  res.cookie('userID', userID, { 
    httpOnly: true, 
    maxAge: 234859550,   // 3 days
    sameSite: true,
    secure: true,
    signed: true
  });

  return next();
};

authController.getCookie = (req, res, next) => {
  if (!req.signedCookies.userID) {
    return res.status(401).json({message: 'Please log in or sign up.'});
  }

  const userID = cookieParser.signedCookie(req.signedCookies.userID, COOKIE_SIG);
  return next();
}

authController.getUsername = (req, res, next) => {
  const userID = cookieParser.signedCookie(req.signedCookies.userID, COOKIE_SIG);

  const query = {
    text: 'SELECT username FROM users WHERE _id = $1',
    values: [userID]
  };

  db.query(query, (err, result) => {
    if (err) {
      console.warn('ERROR at getUsername: ', err);
      return next(err);
    }
    
    if (!result.rows.length) {
      // if no user found with that name and pass, send 401
      return res.status(401).json({ status: 'No such user' });
    }

    res.locals.username = result.rows[0].username;
    console.log('username retrieved:', res.locals.username);
    return next();
  });
}
 
module.exports = authController;