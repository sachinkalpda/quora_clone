const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

const passport = require('passport');
const { verify } = require('crypto');

router.get('/login',userController.login);

router.post('/create',userController.createUser);


router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/login'}
),userController.createSession);

// route for logout
router.get('/logout',userController.destroySession);

// route for render profile page
router.get('/profile',passport.checkAuthentication,userController.viewProfile);

// route for update the user about information
router.post('/profile/about',passport.checkAuthentication,userController.updateAbout);

// route for updating the user profession
router.post('/profile/profession',passport.checkAuthentication,userController.updateProfession);

// route for updating the user avatar
router.post('/profile/avatar',passport.checkAuthentication,userController.updateAvatar);

// route for following the other user
router.get('/follow/:id',passport.checkAuthentication,userController.follow);

// route for adding new interests
router.post('/interest/add',passport.checkAuthentication,userController.addInterest);

// ajax route for removing the interests
router.get('/interest/remove/:id',passport.checkAuthentication,userController.removeInterest);

// route for verify the account
router.get('/verify/:token',userController.verifyAccount);

// route for forgot password
router.post('/forgot-password',userController.forgotPassword);

// route for render reset password page
router.get('/reset/password/?:token',userController.resetPasswordLink);

// route for reset the password of user
router.post('/password/reset',userController.resetPassword);

// route for google authentcation
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// callback route for google authentication
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/login'}), userController.createSession);


module.exports = router;