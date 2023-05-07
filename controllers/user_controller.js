const User = require('../models/user');
const Topic = require('../models/topic');
const Token = require('../models/Token');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const verifyEmailMailer = require('../mailers/verify_email_mailer');


module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('login');
}


module.exports.createUser = async function (req, res) {
    if (req.body.password == req.body.password_confirm) {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            });
            let token = await Token.create({
                token : crypto.randomBytes(32).toString("hex"),
                user : newUser._id,
            });
            
            verifyEmailMailer.newVerifyEmail(newUser,token);
            req.flash('success', "User Registered");
            return res.redirect('/user/login');
        } else {
            req.flash('error', "User Already Exists!");
            return res.redirect('back');
        }
    }
}


module.exports.createSession = function (req, res) {
    req.flash('success', 'Login Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log('Error', err);
            return;
        }
        req.flash('success', 'Logout Successfully');
        return res.redirect('/user/login');
    })
}


module.exports.viewProfile = async function (req, res) {

    try {
        let topics = await Topic.find({});
        let user = await User.findById(req.user.id).populate('interests').populate('followers').populate('following');
        if (user) {
            return res.render('profile', {
                'userInfo': user,
                'topics': topics,
            });

        } else {
            req.flash('error', 'Something went wrong');
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error user', err);
    }

}

module.exports.updateAbout = async function (req, res) {

    try {
        let user = await User.findByIdAndUpdate(req.user.id);
        user.about = req.body.about;
        await user.save();
        req.flash('success', 'Profile Updated !');
        return res.redirect('back');

    } catch (err) {
        console.log('error User', err);

    }
}

module.exports.updateProfession = async function (req, res) {

    try {
        let user = await User.findByIdAndUpdate(req.user.id);
        user.profession = req.body.profession;
        await user.save();
        req.flash('success', 'Profile Updated !');
        return res.redirect('back');

    } catch (err) {
        console.log('error User', err);

    }
}


module.exports.updateAvatar = async function (req, res) {
    try {
        let user = await User.findByIdAndUpdate(req.user.id);
        User.uploadedAvatar(req, res, async function (err) {
            if (err) {
                console.log(err);
                return;
            }
            if (user.avatar) {
                if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }

            }
            if (req.file) {
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            await user.save();
            req.flash('success', 'Profile Updated Successfully');
            return res.redirect('back');
        });

    } catch (err) {
        console.log('Error User', err);

    }
}

module.exports.follow = async function (req, res) {
    try {

        if (req.params.id != req.user.id) {

            let loggedUser = await User.findById(req.user.id);

            let user = await User.findById(req.params.id).populate('followers following');
            if (user) {
                let follwingExist = user.followers.find(i => i.id == loggedUser.id);
                // console.log(follwingEx);
                if (follwingExist) {
                    user.followers.pull(loggedUser._id);
                    await user.save();
                    loggedUser.following.pull(user._id);
                    await loggedUser.save();
                    return res.json(200, {
                        'message': 'Follow',
                    });
                } else {
                    user.followers.push(loggedUser._id);
                    await user.save();
                    loggedUser.following.push(user._id);
                    await loggedUser.save();
                    return res.json(200, {
                        'message': 'Following',
                    });

                }
            } else {
                return res.json(500, {
                    'error': 'Internal Server Error',
                });
            }
        }else{
            return res.json(200, {
                'message': "You can't follow yourself",
            });
        }


    } catch (err) {
        console.log('Error user', err);

    }
}

module.exports.addInterest = async function (req, res) {
    try {
        let topic = await Topic.findById(req.body.interest);
        if (topic) {
            let user = await User.findById(req.user.id);
            let interestExist = user.interests.some(function (interest) {
                return interest == topic.id;
            });
            if (!interestExist) {
                user.interests.push(topic._id);
                await user.save();
                req.flash('success', 'Intereset Saved');
                return res.redirect('back');
            }
            req.flash('error', 'Already Exist');
            return res.redirect('back');

        } else {
            req.flash('error', 'Invalid Topic');
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error User', err);

    }
}

module.exports.removeInterest = async function (req, res) {
    try {
        let topic = await Topic.findById(req.params.id);
        if (topic) {
            let user = await User.findById(req.user.id);
            user.interests.pull(topic.id);
            await user.save();
            req.flash('success', 'Interest Removed');
            return res.redirect('back');

        } else {
            req.flash('error', 'Invalid Topic');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error user', err);
        return err;

    }
}


module.exports.verifyAccount = async function(req,res){
    let token = await Token.findOne({token: req.params.token});
    if(token){
        let user = await User.findById(token.user);
        if(user){
            user.verify = true;
            await user.save();
            await token.deleteOne();
            req.flash('success','Email Verified. Please Login to Continue');
            return res.redirect('/user/login');
        }
        req.flash('error',"User Doesn't Exist");
        return res.redirect('/user/login');

    }
    req.flash('error','Invalid Token');
    return res.redirect('/user/login');
   
}

module.exports.forgotPassword = async function(req,res){
    try {
        let user = await User.findOne({email : req.body.email});
        if(user){
            let token = await Token.create({
                token : crypto.randomBytes(32).toString("hex"),
                user : user._id,
            });
            verifyEmailMailer.resetPassword(user,token);
            req.flash('success','Reset Password Link Send to Your Email');
            return res.redirect('back');

        }else{
            req.flash('error','Record Not Found!');
            return res.redirect('back');
        }
        
    } catch (err) {
        console.log('Error User',err);        
    }

}

module.exports.resetPasswordLink = async function(req,res){
    let token = await Token.findOne({token: req.params.token});
    if(token){
        let user = await User.findById(token.user);
        if(user){
            return res.render('reset_password',{
                token : token,
            });
        }
        req.flash('error',"User Doesn't Exist");
        return res.redirect('/user/login');

    }
    req.flash('error','Invalid Token');
    return res.redirect('/user/login');

}

module.exports.resetPassword = async function(req,res){
    let token = await Token.findOne({token: req.body.token});
    if(token){
        let user = await User.findById(token.user);
        if(user){
            if(req.body.password == req.body.password_confirm){
                user.password = bcrypt.hashSync(req.body.password, 10);
                await user.save();
                await token.deleteOne();
                req.flash('success','Password Changed. Please Login to Continue');
                return res.redirect('/user/login');
            }
            req.flash('error',"Password Doesn't Match");
            return res.redirect('/user/login');
            
        }
        req.flash('error',"User Doesn't Exist");
        return res.redirect('/user/login');

    }
    req.flash('error','Invalid Token');
    return res.redirect('/user/login');
}