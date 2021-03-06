const passport = require('passport');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title:"User profile",
            profile_user: user
        });
    });
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     res.status(401).send('unAuthorized');
    // }

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('multer error ', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                
                if(req.file){
                    
                     if(user.avatar){
                        fs.unlinkSync(path.join(__dirname+'/..'+user.avatar));
                     }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
                
            });
        }catch(err){
            req.flash('error ', err);
            return res.redirect('back');
        }
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
    //req.flash('success', 'you are logged in!');
    return res.redirect('/');
}

module.exports.signout = function(req, res){
    req.logout();
    req.flash('success', 'you are logged out!');
    return res.redirect('/');

}

