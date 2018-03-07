
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


  const msg = {
    to: 'balionisalexia@gmail.com',
    from: 'rodolfo@hotmail.com',
    subject: 'teste',
    text: 'text',
    html: '<strong></strong>',
  };

  sgMail.send(msg).then((response) => console.log(response))
  .catch(error => {console.log(error)});
