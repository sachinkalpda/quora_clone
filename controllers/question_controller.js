const Question = require('../models/question');
const Answer = require('../models/answer');
const Topic = require('../models/topic');

module.exports.add = async function (req, res) {


    try {
        console.log(req.body.topic);
        let topic = await Topic.findById(req.body.topic);
        if(topic){
            const question = await Question.create({
                content: req.body.question,
                user: req.user.id,
                topic : req.body.topic,
            });
            req.flash('success', 'Question Added to feed');
            return res.redirect('back');
        }else{
            req.flash('error','Invalid Topic');
            return res.redirect('back');
        }
        
    } catch (err) {
        console.log('Error Question', err);
        return;
    }

}

module.exports.all = async function (req, res) {
    try {
        let questions = await Question.find({ user: { $nin: req.user.id } }).populate('user').populate('upvotes');
        return res.render('questions', {
            questions: questions,
        });

    } catch (err) {
        console.log('Error Question', err);

    }
}


module.exports.answer = async function (req, res) {
    try {
        let question = await Question.findById(req.body.question)
            .populate({
                path: 'answers',
                populate: {
                    path: 'user'
                },
            });
        let answer = await Answer.findOne({question : question._id,user : req.user._id});
        if (answer) {
            answer.content = req.body.answer;
            await answer.save();
            req.flash('success','Answer Updated!');
            return res.redirect('back');
        } else {
            if (question) { 
                let answer = await Answer.create({
                    content: req.body.answer,
                    user: req.user._id,
                    question: req.body.question
                });

                if (answer) {
                    question.answers.push(answer._id);
                    await question.save();
                    req.flash('success', 'Answer Published!');
                    return res.redirect('back');
                } else {
                    req.flash('error', 'Somethig Went Wrong');
                    return res.redirect('back');
                }
            } else {
                req.flash('error', "Invalid Question");
                return res.redirect('back');
            }
        }

    } catch (err) {
        console.log('Error Question', err);

    }
}


module.exports.view = async function (req, res) {
    try {
        let question = await Question.findById(req.params.id).populate('user').populate('upvotes');
        let answers = await Answer.find({question : question.id})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }                
            }).populate('upvotes');
            // console.log(answers);
        if (question) {
            return res.render('question', {
                question: question,
                answers : answers
            });
        } else {
            req.flash('error', 'Invalid Question');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error Question', err);
    }
}