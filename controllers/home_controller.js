const Post = require('../models/post');

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
        if(err){
            console.log("error in fetching posts"); return;
        }
        return res.render('home', {
            title: "HomePage",
            posts: posts
        });
    });  
}