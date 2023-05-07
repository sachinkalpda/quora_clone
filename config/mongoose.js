const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;


db.on('error',console.error.bind(console,'Error Connecting to Database'));


db.once('open',function(){
    console.log('Connected to database');
});

module.exports = db;