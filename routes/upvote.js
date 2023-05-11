const express = require('express');

const router = express.Router();

const passport = require('passport');
const upvoteController = require('../controllers/upvote_controller');


// route for upvote the question or answer
router.get('/toggle',passport.checkAuthentication,upvoteController.toggle);


module.exports = router;

