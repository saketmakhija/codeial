const express = require('express');
const port = 8000;
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(ejsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'codeial',
    secret:'abc',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*100*60)
    },
    //mongo store is used to store session cookie in the db
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || "connected to MongoDB")
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`error is ${err}`);
    }
    console.log(`server is running on port ${port}`);
});