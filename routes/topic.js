const express = require('express');

const router = express.Router();

const passport = require('passport');

const topicController = require('../controllers/topic_controller');

router.post('/add',passport.checkAuthentication,topicController.add);
router.get('/all',passport.checkAuthentication,topicController.all);




module.exports = router;


