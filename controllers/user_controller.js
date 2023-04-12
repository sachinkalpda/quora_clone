const User = require('../models/user');

const fs = require('fs');
const path = require('path');

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
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
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
        let user = await User.findById(req.user.id);
        if (user) {
            return res.render('profile', {
                'userInfo': user,
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
        req.flash('success','Profile Updated !');
        return res.redirect('back');
        
    } catch (err) {
        console.log('error User',err);
        
    }
}

module.exports.updateProfession = async function (req, res) {

    try {
        let user = await User.findByIdAndUpdate(req.user.id);
        user.profession = req.body.profession;
        await user.save();
        req.flash('success','Profile Updated !');
        return res.redirect('back');
        
    } catch (err) {
        console.log('error User',err);
        
    }
}


module.exports.updateAvatar = async function(req,res){
    try {
        let user = await User.findByIdAndUpdate(req.user.id);
        User.uploadedAvatar(req,res,async function(err){
            if(err){
                console.log(err);
                return;
            }
            if(user.avatar){
                if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
               
            }
            if(req.file){
                user.avatar = User.avatarPath+ '/' +req.file.filename;
            }
            await user.save();
            req.flash('success','Profile Updated Successfully');
            return res.redirect('back');   
       });
        
    } catch (err) {
        console.log('Error User',err);
        
    }
}

module.exports.follow = async function(req,res){
    try {
        let loggedUser = await User.findById(req.user.id);

        let user = await User.findById(req.params.id).populate('followers following');
        if(user){
            let follwingExist = user.followers.find(i => i.id == loggedUser.id);
            // console.log(follwingEx);
            if(follwingExist){
                user.followers.pull(loggedUser._id);
                await user.save();
                loggedUser.following.pull(user._id);
                await loggedUser.save();
                return res.json(200,{
                    'message' : 'Follow',
                });
            }else{
                user.followers.push(loggedUser._id);
                await user.save();
                loggedUser.following.push(user._id);
                await loggedUser.save();
                return res.json(200,{
                    'message' : 'Following',
                });

            }
        }else{
            return res.json(500,{
                'error' : 'Internal Server Error',
            });
        }

        
    } catch (err) {
        console.log('Error user',err);
        
    }
}