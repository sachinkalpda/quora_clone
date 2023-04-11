const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const AVATAR_PATH = path.join('/uploads/user/avatar');
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required : true,
        unique : true,
    },
    password : {
        type: String,
        required: true,
    },
    about : {
        type: String,
    },
    profession: {
        type: String,
    },
    avatar : {
        type: String,
        default: "/uploads/user/avatar/user.jpg",
    }
},{
    timestamps : true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        console.log(extension);
        cb(null, file.fieldname + '-' + uniqueSuffix+'.'+extension);
    }
});

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');

userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;