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

router.get('/profile',passport.checkAuthentication,userController.viewProfile);
router.post('/profile/about',passport.checkAuthentication,userController.updateAbout);
router.post('/profile/profession',passport.checkAuthentication,userController.updateProfession);
router.post('/profile/avatar',passport.checkAuthentication,userController.updateAvatar);
router.get('/follow/:id',passport.checkAuthentication,userController.follow);


module.exports = router;