const express = require('express');

const router = express.Router();

const passport = require('passport');
const commentController = require('../controllers/comment_controller');


router.post('/add',passport.checkAuthentication,commentController.add);

router.get('/delete/:id',passport.checkAuthentication,commentController.delete);




module.exports = router;