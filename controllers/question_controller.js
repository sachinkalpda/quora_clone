const Question = require('../models/question');
const Answer = require('../models/answer');
const Topic = require('../models/topic');


// method for adding a  new question
module.exports.add = async function (req, res) {


    try {
        console.log(req.body.topic);
        let topic = await Topic.findById(req.body.topic);
        if (topic) {
            const question = await Question.create({
                content: req.body.question,
                user: req.user.id,
                topic: req.body.topic,
            });
            req.flash('success', 'Question Added to feed');
            return res.redirect('back');
        } else {
            req.flash('error', 'Invalid Topic');
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error Question', err);
        return;
    }

}

// method for view all questions
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

// method for view the question which user asked 
module.exports.myQuestion = async function (req, res) {
    try {
        let questions = await Question.find({ user: req.user.id }).populate('user').populate('upvotes');
        return res.render('myquestions', {
            questions: questions,
        });

    } catch (err) {
        console.log('Error Question', err);

    }
}

// method to add or update the answer for a question
module.exports.answer = async function (req, res) {
    try {

        let question = await Question.findById(req.body.question)
            .populate('user')
            .populate({
                path: 'answers',
                populate: {
                    path: 'user'
                },
            });
        if (question.user.id != req.user.id) {


            let answer = await Answer.findOne({ question: question._id, user: req.user._id });
            if (answer) {
                answer.content = req.body.answer;
                await answer.save();
                req.flash('success', 'Answer Updated!');
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
        }
        req.flash('error', "You Can't Answer your question");
        return res.redirect('back');

    } catch (err) {
        console.log('Error Question', err);

    }
}

// method of view the qusetion and thier answers 
module.exports.view = async function (req, res) {
    try {
        let question = await Question.findById(req.params.id).populate('user').populate('upvotes');
        let answers = await Answer.find({ question: question.id })
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }
            }).populate('upvotes');
        // console.log(answers);
        if (question) {
            let related_questions = await Question.find({
                topic: question.topic,
                user: { $nin: req.user.id },
                _id: { $nin: question.id }

            });
            return res.render('question', {
                question: question,
                answers: answers,
                related_questions: related_questions
            });
        } else {
            req.flash('error', 'Invalid Question');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error Question', err);
    }
}

// method for view the question related to a topic
module.exports.topicWiseQuestion = async function(req,res){
    try {
        let topic = await Topic.findById(req.params.id);
        if(topic){
            let questions = await Question.find({
                user : {$nin : req.user.id},
                topic : topic.id
            }).populate('user').populate('upvotes');
            return res.render('questions', {
                questions: questions,
            });
        }
        req.flash('error', 'Invalid Topic');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in questions in topic',error);
        return;
    }
}

// method for search a question
module.exports.search = async function(req,res){
    try {
        let query = req.body.search;
        console.log(query);
        let questions = await Question.find({content: new RegExp(query, 'i')}).populate('user').populate('upvotes');
        return res.render('search_result', {
            questions: questions,
            query : query
        });
        
    } catch (error) {
        console.log('Error in Question search',error);
        return;
    }
}