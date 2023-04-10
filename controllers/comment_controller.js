const Answer = require('../models/answer');
const Comment = require('../models/comment');

module.exports.add = async function (req, res) {

    try {
        let answer = await Answer.findById(req.body.answer_id);
        if (answer) {
            let comment =await Comment.create({
                content : req.body.comment,
                user : req.user._id,
                answer : req.body.answer_id
            });
            if(comment){
                answer.comments.push(comment._id);
                await answer.save();
                req.flash('success','Comment Published !');
                return res.redirect('back');
            }else{
                req.flash('error','Something Went Wrong!');
                return res.redirect('back');
            }
        } else {
            req.flash('error', 'Invalid Answer');
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error Comment', err);
    }
}


module.exports.delete = async function(req,res){
    // console.log(req.params.id);
    try {
        let comment = await Comment.findById(req.params.id).populate('user');
        if(comment){
            // console.log(comment.user.id);
            if(comment.user.id == req.user._id){
                await Comment.findByIdAndDelete(req.params.id);
                await Answer.findByIdAndUpdate(comment.answer,{$pull : {comments : req.params.id}});
                req.flash('success','Comment Deleted!');
                return res.redirect('back');
                
            }else{
                req.flash('error','You Are not Authorize to complete this action');
                return res.redirect('back');
            }

        }else{
            req.flash('error','Invalid Comment');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error comment',err);
        
    }
}