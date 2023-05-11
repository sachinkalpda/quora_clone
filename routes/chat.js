const express = require('express');

const router = express.Router();

const passport = require('passport');
const chatController = require('../controllers/chat_controller');

// to render the chats view
router.get('/all',passport.checkAuthentication,chatController.chat);

// to get the all messages and room
router.post('/get',passport.checkAuthentication,chatController.getMessage);

// for saving the message in db
router.post('/save',passport.checkAuthentication,chatController.saveMessage);





module.exports = router;