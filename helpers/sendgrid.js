
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail (to, from, subject, text) {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: '<strong></strong>',
  }

  sgMail.send(msg).then(response =>{
    console.log('email enviado');
  })
}
