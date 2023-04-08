const express = require('express');
const port = 8000;
const app = express();

// for database
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');


// authentication library
const passport = require('passport');
const LocalStrategy = require('./config/passport_local_strategy');

// for session 

const session = require('express-session');


app.use(express.urlencoded());
app.use(expressLayout);
app.use(express.static('./assets'));

app.set('layout extractStyles', true);
app.set('layout extractScript', true);

// set view engine
app.set('view engine','ejs');
app.set('views','./views');

// use session
app.use(session({
    name : 'quora',
    secret: 'quora clone',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        // secure: true ,
        maxAge : (1000*60*100)
    }
}));


// passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

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
