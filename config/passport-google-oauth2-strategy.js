const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');


passport.use(new googleStrategy({
    clientID: "496437726544-fec1nsrnck20deetkoj0o4pi6k43v7rr.apps.googleusercontent.com",
    clientSecret: "E0K0nuNAdujq5wDTc4yeEWz7",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log('error in google auth startegy ', err); return;
        }
        console.log(profile);

        if(user){
            return done(null, user);
        }
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log('error in creating user ', err);
                    return;
                }else{
                    return done(null, user);
                }
            });
        }
    });
}
));

module.exports = passport;