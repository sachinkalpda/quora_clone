const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    name : {
        type :String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    }
});

const Topic = mongoose.model('Topic',topicSchema);


module.exports = Topic;