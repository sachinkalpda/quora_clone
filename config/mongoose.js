const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quora_development');

const db = mongoose.connection();


db.on('error',console.error.bind(console,'Error Connecting to Database');


db.once('open',function(){
    console.log('Connected to database');
});

module.exports = db;