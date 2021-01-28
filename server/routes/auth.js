const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', 
  authController.addUser,
  authController.setCookie,
  (req, res) => res.status(200).json({ status: 'okay' })
);

router.post('/login', 
  authController.attemptLogin,
  authController.setCookie,
  (req, res) => res.status(200).json({ status: 'okay' })
);


module.exports = router;