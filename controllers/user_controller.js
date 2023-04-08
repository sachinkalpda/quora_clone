const User = require('../models/user');

module.exports.login =  function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login');
}


module.exports.createUser = async function(req,res){
    if(req.body.password == req.body.password_confirm){
        const user = await User.findOne({email:req.body.email});

        if(!user){
            await User.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });
            req.flash('success',"User Registered");
            return res.redirect('/user/login');
        }else{
            req.flash('error',"User Already Exists!");
            return res.redirect('back');
        }
    }
}


module.exports.createSession = function(req,res){
    req.flash('success','Login Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('Error',err);
            return;
        }
        req.flash('success','Logout Successfully');
        return res.redirect('/user/login');
    })
}