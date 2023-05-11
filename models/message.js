const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message : {
        type : String,
        required : true,
    },
    room : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Room'
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    read : {
        type : Boolean,
        required : true,
        default : false,
    }
},{
    timestamps : true
});

const  Message = mongoose.model('Message',messageSchema);

module.exports = Message;
