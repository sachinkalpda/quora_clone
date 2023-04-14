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

router.post('/interest/add',passport.checkAuthentication,userController.addInterest);
router.get('/interest/remove/:id',passport.checkAuthentication,userController.removeInterest);

router.get('/verify/:token',userController.verifyAccount);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/login'}), userController.createSession);


module.exports = router;