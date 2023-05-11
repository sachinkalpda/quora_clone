const User = require('../models/user');
const Message = require('../models/message');
const Room = require('../models/room');
const crypto = require('crypto');

// method for render the chat page
module.exports.chat = async function(req,res){
    try {
        let currentUser  = await User.findById(req.user.id).populate('followers');
        return res.render('user_chat',{
            title : 'Chat | Quora',
            currentUser : currentUser
        });
    } catch (error) {
        console.log('Error in chat',error);
        return;
    }
    
}

// method for get the messages and room for chat
module.exports.getMessage = async function(req,res){
    try {
        let room = await Room.findOne({
            users :  {$all : [req.user.id,req.body.reciever]}
        });
        if(room){
            let messages = await Message.find({room : room._id});
            return res.json(200,{
                room : room,
                messages : messages,
            });
        }

        let newRoom = await Room.create({
            name : crypto.randomBytes(8).toString('hex')
        });
        if(newRoom){
            newRoom.users.push(req.user._id);
            newRoom.users.push(req.body.reciever);
            await newRoom.save();
            return res.json(200,{
                room : newRoom,
                messages : []
            });
        }
        return res.json(500,{
            message : 'Internal Server Error'
        });
    } catch (error) {
        console.log('Error in get Messages',error);
        return;
    }
}

// method for saving the chat messages in db
module.exports.saveMessage = async function(req,res){
    try {
        let room = await Room.findById(req.body.room);
        if(room){
            let reciever = await User.findById(req.body.reciever);
            console.log(req.body.reciever);
            if(reciever){
                let message = await Message.create({
                    message : req.body.message,
                    room : req.body.room,
                    sender : req.user._id,
                    reciever : req.body.reciever
                })
                if(message){
                    return  res.json(200,{
                        room : room
                    })
                }
                return res.json(500,{
                    message : 'Something Went Wrong!',
                });
            }
            return res.json(500,{
                message : 'Invalid User',
            });

        }
        return res.json(500,{
            message : 'Invalid Room',
        });
        
    } catch (error) {
        console.log('Error in Message saving',error);
        return;
    }
}