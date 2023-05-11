const mongoose = require('mongoose');

// connect to db
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

// on error 
db.on('error',console.error.bind(console,'Error Connecting to Database'));

// on success
db.once('open',function(){
    console.log('Connected to database');
});

module.exports = db;