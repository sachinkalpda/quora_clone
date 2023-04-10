const express = require('express');

const router = express.Router();

const passport = require('passport');
const upvoteController = require('../controllers/upvote_controller');

router.get('/toggle',passport.checkAuthentication,upvoteController.toggle);


module.exports = router;

