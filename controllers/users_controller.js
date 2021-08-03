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