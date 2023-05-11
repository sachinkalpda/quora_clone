const express = require('express');

const router = express.Router();

const passport = require('passport');

const topicController = require('../controllers/topic_controller');

// route for adding a new topic
router.post('/add',passport.checkAuthentication,topicController.add);

// ajax route for get all topics
router.get('/all',passport.checkAuthentication,topicController.all);




module.exports = router;


