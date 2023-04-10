const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    answers : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Answer',
        }
    ],
    upvotes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Upvote',
        }
    ]

},
{
    timestamps : true,
})

const Question = mongoose.model('Question',questionSchema);


module.exports = Question;