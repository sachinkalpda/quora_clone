const Question = require('../models/question');
const Answer = require('../models/answer');
const Downvote = require('../models/downvote');


// method for downvote the question or answer
module.exports.toggle = async function (req, res) {
    console.log(req.query);
    if (req.query.type == 'Question' || req.query.type == 'Answer') {
        try {
            let downvoteable;
            if (req.query.type == 'Question') {
                downvoteable = await Question.findById(req.query.id).populate('downvotes').populate('user');
            } else if (req.query.type == 'Answer') {
                downvoteable = await Answer.findById(req.query.id).populate('downvotes').populate('user');
            }
            if(downvoteable.user.id == req.user._id){
                return res.json(200, {
                    'message': "You Can't Complete this Action",
                });
            }
            let existingDownvote = await Downvote.findOne({
                user: req.user._id,
                onModel: req.query.type,
                downvoteable: req.query.id,
            });
            if(existingDownvote) {
                downvoteable.downvotes.pull(existingDownvote._id);
                await downvoteable.save();
                await existingDownvote.deleteOne();
            }else{
                const newDownvote = await Downvote.create({
                    user: req.user.id,
                    onModel: req.query.type,
                    downvoteable: req.query.id,
                });
                downvoteable.downvotes.push(newDownvote._id);
                await downvoteable.save();
            }
            let downCount = downvoteable.downvotes.length;
            return res.json(200, {
                'message': 'Downvoted!',
                'upvotes' : downCount
            });

        } catch (err) {
            console.log('Error Upvote', err);
        }

    }
    req.flash('error', 'Invalid Request !');
    return res.redirect('back');
}