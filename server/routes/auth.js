const express = require('express');
const auth = require('../controllers/authController');
const router = express.Router();

router.get('/cookie',
  auth.getCookie,
  auth.getUsername,
  (req, res) => res.status(200).json(res.locals),
);

router.post('/signup', 
  auth.checkUniqueness,
  auth.addUser,
  auth.setCookie,
  (req, res) => res.status(200).json({ message: 'Account created.' })
);

router.post('/login', 
  auth.attemptLogin,
  auth.setCookie,
  (req, res) => res.status(200).json({ message: 'User logged in.' })
);


module.exports = router;