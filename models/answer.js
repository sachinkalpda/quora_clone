const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    content: {
        type : String,
        required : true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    question : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Question'
    },
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ],
    upvotes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Upvote',
        }
    ]
},{
    timestamps :true,
});

const Answer = mongoose.model('Answer',answerSchema);


module.exports = Answer;