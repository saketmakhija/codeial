const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    //return res.end('<h1>Express is up for codeial</h1>');

    try{
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path:'comments',
                populate: {
                    path:'user'
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: "HomePage",
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log('error ',err);
        return;
    }
      
}