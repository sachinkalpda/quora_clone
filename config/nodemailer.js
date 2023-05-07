const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
  });


const renderTemplate = (data,relativePath) =>{
    let mailHTML;

    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Rendering Email Template Errr',err);
                return;
            }
            mailHTML = template
        }
    )
    return mailHTML;
}


module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}