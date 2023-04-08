const User = require('../models/user');

module.exports.login =  function(req,res){
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
            return res.redirect('/user/login');
        }else{
            return res.redirect('back');
        }
    }
}


module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('Error',err);
            return;
        }
        return res.redirect('/user/login');
    })
}