const express = require('express');
const port = 8000;
const app = express();

// for database
const db = require('./config/mongoose');


// set view engine
app.set('view engine','ejs');
app.set('views','./views');


// for routes
app.use('/',require('./routes'));


// to run server on specify port
app.listen(port,function(err){
    if(err){
        console.log('Error',err);
        return;
    }  
    console.log('Server is Running on Port :',port);
});