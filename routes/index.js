const express = require('express');

const router = express.Router();

const homepageController = require('../controllers/home_controller');

const passport = require('passport');

router.get('/',passport.checkAuthentication,homepageController.home);

router.use('/user',require('./user'));

module.exports = router;