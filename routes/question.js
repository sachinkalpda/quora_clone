const express = require('express');

const router = express.Router();

const passport = require('passport');

const questionController = require('../controllers/question_controller');

router.post('/add',passport.checkAuthentication,questionController.add);

router.get('/all',passport.checkAuthentication,questionController.all);

router.post('/answer',passport.checkAuthentication, questionController.answer);

router.get('/view/:id',passport.checkAuthentication, questionController.view);


module.exports = router;