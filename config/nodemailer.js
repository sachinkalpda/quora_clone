const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "43508d2aae4a20",
      pass: "74cd7093e3345c"
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