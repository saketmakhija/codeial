const passport = require('passport');
const User = require('../models/user');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title:"User profile",
            profile_user: user
        });
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        res.status(401).send('unAuthorized');
    }
}

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signup', {
        title:"signup"
    });
}

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signin', {
        title:"signin"
    });
}

module.exports.createUser = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log("error in findind user"); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log("error in creating users"); return}
                res.redirect('/users/signin');
            });
            
        }
    });
}

module.exports.createUserSession = function(req, res){
    return res.redirect('/');
}

module.exports.signout = function(req, res){
    req.logout();
    return res.redirect('/');

}

