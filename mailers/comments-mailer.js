const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) =>{

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'saketrossjuly.rosstaylor@gmail.com',
        to: comment.user.email,
        subject: 'new comment',
        html: htmlString
    }, (err, info) =>{
        if(err){console.log('error in mailing ', err);return;}
        console.log('mail sent ', info);
        return;
    });
}