const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    answer : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Answer'
    }
},{
    timestamps : true,
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;