const mongoose = require('mongoose');

const downvoteSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
    },
    downvoteable : {
        type : mongoose.Schema.Types.ObjectId,
        refPath : 'onModel',
        required : true,
    },
    onModel : {
        type : String,
        required : true,
        enum : ['Question','Answer']
    }

},{
    timestamps : true,
});

const Downvote = mongoose.model('Downvote',downvoteSchema);

module.exports = Downvote;

