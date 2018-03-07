
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');


  const msg = {
    to: 'balionisalexia@gmail.com',
    from: 'rodolfo@hotmail.com',
    subject: 'teste',
    text: 'text',
    html: '<strong></strong>',
  };

  sgMail.send(msg).then((response) => console.log(response))
  .catch(error => {console.log(error)});
