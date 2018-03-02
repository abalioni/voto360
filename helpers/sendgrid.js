var dotenv = require('dotenv');
dotenv.load();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const msg = {
  to: 'balionisalexia@gmail.com',
  from: 'rodolfo@hotmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg).then(response =>{
  console.log(response);
})
