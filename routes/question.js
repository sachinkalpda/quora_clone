const express = require('express');

const router = express.Router();

const passport = require('passport');

const questionController = require('../controllers/question_controller');

router.post('/add',passport.checkAuthentication,questionController.add);


module.exports = router;