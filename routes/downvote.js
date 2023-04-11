const express = require('express');

const router = express.Router();

const passport = require('passport');
const downvoteController = require('../controllers/downvote_controller');

router.get('/toggle',passport.checkAuthentication,downvoteController.toggle);


module.exports = router;

