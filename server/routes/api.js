const express = require('express');
const feedController = require('../controllers/feedController');
const router = express.Router();

router.get('/',
  feedController.getScriptions,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

router.put('/',
  feedController.getSong,
  feedController.addScription,
  (req, res) => {
    res.status(200).json({ status: 'okay' });
  }
);

router.put('/comments',
  feedController.addComment,
  (req, res) => {
    res.status(200).json({status: "okay"});
  }
)

router.get('/comments',
  feedController.getComments,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

module.exports = router;