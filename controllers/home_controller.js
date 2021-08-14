const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    //return res.end('<h1>Express is up for codeial</h1>');
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path:'user'
        }
    })
    .exec(function(err, posts){
        
        User.find({}, function(err, users){
            return res.render('home', {
                title: "HomePage",
                posts: posts,
                all_users: users
            });
        });
        
    });  
}