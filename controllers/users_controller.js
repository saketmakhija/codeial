const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title:"profile"
    });
}

module.exports.signup = function(req, res){
    return res.render('signup', {
        title:"signup"
    });
}

module.exports.signin = function(req, res){
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

}