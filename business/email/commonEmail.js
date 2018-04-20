const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


exports.resetPassword = function(email, subject, html){

  const msg = {
    to: email,
    from: 'noreply@voto360.com',
    subject: subject,
    html: html,
  }
  console.log(msg)

  sgMail.send(msg)
    .then(response =>{
      console.log('Email enviado');
    }
  )
}
