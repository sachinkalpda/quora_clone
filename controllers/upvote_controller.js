const Question = require('../models/question');
const Answer = require('../models/answer');
const Upvote = require('../models/upvote');


// method for upvoting the question or answer

module.exports.toggle = async function (req, res) {
    if (req.query.type == 'Question' || req.query.type == 'Answer') {
        try {
            let upvoteable;
            if (req.query.type == 'Question') {
                upvoteable = await Question.findById(req.query.id).populate('upvotes').populate('user');
            } else if (req.query.type == 'Answer') {
                upvoteable = await Answer.findById(req.query.id).populate('upvotes').populate('user');
            }
            if(upvoteable.user.id == req.user._id){
                return res.json(200, {
                    'message': "You Can't Complete this Action",
                });
            }
            let existingUpvote = await Upvote.findOne({
                user: req.user._id,
                onModel: req.query.type,
                upvoteable: req.query.id,
            });
            if(existingUpvote) {
                upvoteable.upvotes.pull(existingUpvote._id);
                await upvoteable.save();
                await existingUpvote.deleteOne();
            }else{
                const newUpvote = await Upvote.create({
                    user: req.user.id,
                    onModel: req.query.type,
                    upvoteable: req.query.id,
                });
                upvoteable.upvotes.push(newUpvote._id);
                await upvoteable.save();
            }
            let upvotesCount = upvoteable.upvotes.length;
            return res.json(200, {
                'message': 'Upvoted !',
                'upvotes' : upvotesCount
            });

        } catch (err) {
            console.log('Error Upvote', err);
        }

    }
    req.flash('error', 'Invalid Request !');
    return res.redirect('back');
}