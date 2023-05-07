const Question = require('../models/question');

module.exports.home = async function(req,res){
    try {
        let topics = req.user.interests;
        let questions;
        if(topics.length == 0){
            questions = await Question.find({ 
                user: { $nin: req.user.id }
            })
            .populate('user')
            .populate('answers');

        }else{
            questions = await Question.find({ 
                topic : req.user.interests,
                user: { $nin: req.user.id }
            })
            .populate('user')
            .populate('answers');
        }
        
        if(questions){
            return res.render('home',{
                questions : questions,
            })
        }else{
            req.flash('error','Something Went Wrong');
            return redirect('back');
        }
        
    } catch (err) {
        console.log('Error Home',err);
        return;
        
    }
}

module.exports.chat = function(req,res){
    return res.render('user_chat');
}