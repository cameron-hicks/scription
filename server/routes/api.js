const express = require('express');
const feedController = require('../controllers/feedController');
const router = express.Router();

router.get('/',
  feedController.getFeed,
  (req, res) => res.status(200).json(res.locals)
);

module.exports = router;