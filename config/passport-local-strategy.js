const passport = require('passport');

const LocalStrategy = require('passport-local');

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, function(req ,email, password, done){

    //authentication using passport
    User.findOne({email: email}, function(err, user){
        if(err){
            req.flash('error', 'error in finding user');
            return done(err);
        }

        if(!user || user.password!=password){
            req.flash('error', 'Invalid username/password!');
            return done(null, false);
        }
        req.flash('success', 'logged in successfully');
        return done(null, user);
    });
    }

));

//serialize the user to decide which key to keep in cook=ies

passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserilaize the user from the cookie

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/signin');

}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;