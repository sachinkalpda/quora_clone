const { verify } = require('jsonwebtoken');
const nodemailer = require('../config/nodemailer');



exports.newVerifyEmail = (user,token) =>{
    let htmlString = nodemailer.renderTemplate({user:user,token:token},'/verify_email.ejs');
    nodemailer.transporter.sendMail({
        from : 'test@quora.com',
        to : user.email,
        subject : 'Verify Your Email',
        html : htmlString 
    },(err,info) => {
        if(err){
            console.log('Error in Sendig Mail',err);
            return;
        }
        console.log("Message",info);
        return;
    });
}


exports.resetPassword = (user,token) =>{
    let htmlString = nodemailer.renderTemplate({user:user,token:token},'/reset_password_email.ejs');
    nodemailer.transporter.sendMail({
        from : 'test@quora.com',
        to : user.email,
        subject : 'Reset Password',
        html : htmlString 
    },(err,info) => {
        if(err){
            console.log('Error in Sendig Mail',err);
            return;
        }
        console.log("Message",info);
        return;
    });
}