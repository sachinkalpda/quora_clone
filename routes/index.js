const express = require('express');

const router = express.Router();



const homepageController = require('../controllers/home_controller');

const passport = require('passport');

router.get('/',passport.checkAuthentication,homepageController.home);

router.use('/user',require('./user'));
router.use('/question',require('./question'));
router.use('/comment',require('./comment'));
router.use('/upvote',require('./upvote'));
router.use('/downvote',require('./downvote'));
router.use('/topic',require('./topic'));

module.exports = router;