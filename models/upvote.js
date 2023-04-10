const mongoose = require('mongoose');

const upvoteSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
    },
    upvoteable : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel',
    },
    onModel : {
        type : String,
        required : true,
        enum : ['Question','Answer'],
    }
},{
    timstamps : true,
});

const Upvote = mongoose.model('Upvote',upvoteSchema);


module.exports = Upvote;
