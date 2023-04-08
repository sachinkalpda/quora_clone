const Question = require('../models/question');

module.exports.add = async function(req,res){


    try {
        const question = await Question.create({
            content : req.body.question,
            user : req.user.id
        });
        req.flash('success','Question Added to feed');
        return res.redirect('back');
    } catch (err) {
        console.log('Error Question',err);
        return;
    }  

}