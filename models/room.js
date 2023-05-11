const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    users : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
},{
    timestamps : true,
});

const Room = mongoose.model('Room',roomSchema);

module.exports = Room;