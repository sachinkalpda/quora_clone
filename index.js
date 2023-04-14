const express = require('express');
const port = 8000;
const app = express();

var moment = require('moment');
app.locals.moment = require('moment');

// for database
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');

// for mongostore
const MongoStore = require('connect-mongo');

// authentication library
const passport = require('passport');
const LocalStrategy = require('./config/passport_local_strategy');
const passportGoogle = require('./config/passport_google_strategy');

// for session 

const session = require('express-session');

// for flash messages
const flash = require('connect-flash');
const flashMiddleware = require('./config/flash_middleware');


app.use(express.urlencoded());
app.use(expressLayout);
app.use(express.static('./assets'));

app.use('/uploads',express.static(__dirname+'/uploads'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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
    },
    store : MongoStore.create({
        mongoUrl : db._connectionString,
        autoRemove : 'disabled',
    },function(err){
        console.log(err);
    })
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// for flash messages
app.use(flash());
app.use(flashMiddleware.setFlash);

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
