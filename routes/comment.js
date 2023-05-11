const express = require('express');

const router = express.Router();

const passport = require('passport');
const commentController = require('../controllers/comment_controller');

// to adding a new comment to answer or question
router.post('/add',passport.checkAuthentication,commentController.add);

// to delete the comment
router.get('/delete/:id',passport.checkAuthentication,commentController.delete);




module.exports = router;