const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const crypto = require('crypto');

const User = require('../models/user');

// using passport google startegy
passport.use(new GoogleStrategy({
        clientID : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRET,
        callbackURL : process.env.CALLBAC_KURL,
    },async function(accessToken,refreshToken,profile,done){
        
        try {
            let user = await User.findOne({email: profile.emails[0].value});
            if(user){
                return (null,user);
            }else{
                let userNew = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    verify : true,
                });
                return done(null, userNew);
            }
            
        } catch (err) {
            console.log('Error google',err);
            return;
            
        }

    }

));


module.exports = passport;