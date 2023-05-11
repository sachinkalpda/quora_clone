const express = require('express');

const router = express.Router();

const passport = require('passport');

const questionController = require('../controllers/question_controller');


// route for add a new question
router.post('/add',passport.checkAuthentication,questionController.add);

// route for view all questions
router.get('/all',passport.checkAuthentication,questionController.all);

// route for view question which user asked in community
router.get('/my-questions',passport.checkAuthentication,questionController.myQuestion);

// route for adding a answer to question
router.post('/answer',passport.checkAuthentication, questionController.answer);

// route for render the view answer for a question
router.get('/view/:id',passport.checkAuthentication, questionController.view);


// route for view the all question for a particular topic
router.get('/topic/:id',passport.checkAuthentication,questionController.topicWiseQuestion);

// route for searching a question
router.post('/search',passport.checkAuthentication,questionController.search);

module.exports = router;