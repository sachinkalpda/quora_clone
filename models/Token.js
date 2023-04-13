const mongoose = require('mongoose');


const tokenSchema = mongoose.Schema({
    token : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
},
{
    timestamps : true,
});

const Token = mongoose.model('Token',tokenSchema);

module.exports = Token;