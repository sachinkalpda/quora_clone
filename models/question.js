const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
    }

},
{
    timeStamps : true,
})

const Question = mongoose.model('Question',questionSchema);


module.exports = Question;