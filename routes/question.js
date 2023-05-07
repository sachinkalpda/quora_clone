const express = require('express');

const router = express.Router();

const passport = require('passport');

const questionController = require('../controllers/question_controller');

router.post('/add',passport.checkAuthentication,questionController.add);

router.get('/all',passport.checkAuthentication,questionController.all);

router.get('/my-questions',passport.checkAuthentication,questionController.myQuestion);

router.post('/answer',passport.checkAuthentication, questionController.answer);

router.get('/view/:id',passport.checkAuthentication, questionController.view);

router.get('/topic/:id',passport.checkAuthentication,questionController.topicWiseQuestion);

router.post('/search',passport.checkAuthentication,questionController.search);

module.exports = router;