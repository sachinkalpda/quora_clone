const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

const passport = require('passport');

router.get('/login',userController.login);

router.post('/create',userController.createUser);


router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/login'}
),userController.createSession);

router.get('/logout',userController.destroySession);



module.exports = router;