const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


exports.resetPassword = function(email, token, subject = 'VOTO360 - Reset password'){

  const msg = {
    to: email,
    from: 'reset@voto360.com',
    subject: subject,
    html: '<p><h1>VOTO360</h1></p><p>Faça o reset da sua senha no link: </p><p>' + `http://localhost:3000/verify-change-password-token/${token}` + '</p>',
  }


  sgMail.send(msg)
    .then(response =>{
      console.log('Email enviado');
    }
  )
}
