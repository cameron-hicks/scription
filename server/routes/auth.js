const express = require('express');
const auth = require('../controllers/authController');
const router = express.Router();

router.post('/signup', 
  auth.addUser,
  auth.setCookie,
  (req, res) => res.status(200).json({ status: 'okay' })
);

router.post('/login', 
  auth.attemptLogin,
  auth.setCookie,
  (req, res) => res.status(200).json({ status: 'okay' })
);


module.exports = router;