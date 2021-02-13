const express = require('express');
const auth = require('../controllers/authController');
const router = express.Router();
// const cookieParser = require('cookie-parser');
// const { COOKIE_SIG } = require('../secrets.js');
// router.use(cookieParser(COOKIE_SIG));
    
router.get('/',
  auth.getCookie,
  auth.getUsername,
  (req, res) => res.status(200).json(res.locals),
);

router.post('/signup', 
  auth.checkUniqueness,
  auth.addUser,
  auth.setCookie,
  (req, res) => res.status(200).json({ ...res.locals, message: 'Account created.' })
);

router.post('/login', 
  auth.attemptLogin,
  auth.setCookie,
  (req, res) => {
    res.status(200).json({ ...res.locals, message: 'User logged in.' })
  }
);


module.exports = router;