const Question = require('../models/question');

module.exports.home = async function(req,res){
    try {
        let topics = req.user.interests;
        let questions = await Question.find({ 
            topic : req.user.interests,
            user: { $nin: req.user.id }
        })
        .populate('user')
        .populate('answers');
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

    return res.render('home');
}