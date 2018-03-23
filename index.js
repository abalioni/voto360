var restify = require('restify');
var axios = require('axios');


var mongoose = require('mongoose').set('debug', true);

var restifyMongoose = require('restify-mongoose');
var jwt = require('jsonwebtoken')

const secret = 'shhhhhh';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voto360');

var emailBusiness = require('./business/email');

console.log(emailBusiness)
var server = restify.createServer({
    name: 'voto360',
    version: '1.0.0'
});

server.use(restify.plugins.CORS( {origins: ['*']}) );
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

server.get('/', function (req, res) {
    res.send("Voto360")
});

require('./models/pessoa').resource.serve('/pessoa', server);
require('./models/candidato').resource.serve('/candidato', server);
require('./models/eleitor').resource.serve('/eleitor', server);
require('./models/partido').resource.serve('/partido', server);
require('./models/dados_politico').resource.serve('/dados_politico', server);
require('./models/patrimonio').resource.serve('/patrimonio', server);
require('./models/projeto').resource.serve('/projeto', server);

server.post('/login', function(req, res, next){
    const email = req.body.email;
    const senha = req.body.senha;
    var pessoaModel = require('./models/pessoa').model

    pessoaModel.find({email}, function (err, docs) {
      // docs is an array
      if(!docs[0]){
        return res.send(401)
      }
      const validPassword = docs[0].verifySenhaSync(senha);
      validPassword ? res.send(200, docs[0]) : res.send(401)
    });
    return next();
})

server.get('/reset/:token', function(req, res, next) {
  const token = req.param.token
  console.log(req.param("token"));
  console.log(req.param.token);
  console.log(token);
  axios.get('http://localhost:8080/pessoa?q=', {
    token: token
  })
  .then(function(res) {
    console.log(res);
    return res;
  })
  .catch(function (error) {
      console.log(error);
      return error;
  })

})

server.get("/reset", (req, res) => {
  const token = req.query.token

  axios.get('http://localhost:8080/pessoa?q=', {
    token: token
  })
  .then(function(res) {

    axios.get('http://localhost:3000/forgotpassword', {
      token: token
    })
    .then((res) => console.log(res))
    .catch(function (err) {
    console.log(err);
  })
    return res;
  })
  .catch(function (error) {

      return error;
  })
  // res.send(token, 'sucesso');

})

server.put('/change-role', function(req, res, next){
    const email = req.body.email;
    const cargo = req.body.cargo;
    console.log(email, cargo);
    var pessoaModel = require('./models/pessoa').model
    var conditions = { email: email }, update = { cargo: cargo }, options = { multi: false };

    pessoaModel.update(conditions, update, options, callback);

    function callback (err, numAffected) {
      if(err){
        return res.send(400, err)
      }
      // numAffected is the number of updated documents
      console.log(numAffected);
      res.send(200)
    }
    return next(); 
})

server.put('/change-info', function(req, res, next){
  const email = req.body.email;
  const newemail = req.body.newemail;
  const cpf = req.body.cpf;
  const senha = req.body.senha;
  const nome = req.body.nome;
  console.log(email, newemail, cpf, senha, nome);
  var pessoaModel = require('./models/pessoa').model
  var conditions = { email: email }, update = { email: newemail, cpf: cpf, senha: senha, nome: nome }, options = { multi: false };

  pessoaModel.update(conditions, update, options, callback);

  function callback (err, numAffected) {
    if(err){
      return res.send(400, err)
    }
    // numAffected is the number of updated documents
    console.log(numAffected);
    res.send(200)
  }
  return next(); 
})

server.put('/change-token', function(req, res, next){
    const email = req.body.email;
    const token = req.body.token;
    console.log(email, token);
    var pessoaModel = require('./models/pessoa').model
    var conditions = { email: email }, update = { senha: token }, options = { multi: false };

    pessoaModel.update(conditions, update, options, callback);

    function callback (err, numAffected) {
      var request = {
        email: req.body.email,
        subject: 'Solicitação de reset de senha',
        text: 'Essa é sua nova senha: '+ token,
      };

      axios.post('http://localhost:8080/sendMail', request).then((response) => console.log(response)).catch(function(error) {
        alert(error);
      });
    }
})

server.post('/change-password', function(req, res, next){
    const email = req.body.email;
    var pessoaModel = require('./models/pessoa').model
    pessoaModel.findOne({email })
      .then(pessoa => {return pessoa})
      .then((pessoa) => emailBusiness.resetPassword(email, jwt.sign({ id: pessoa._id }, secret)))
      .then(()=> res.send(200))
      .catch(err => {console.log(err); res.send(400, err)})
    return next();
})

server.post('/verify-change-password-token', function(req, res, next){
  const {password, token} = req.body;
  console.log(req.body);
  const pessoa = jwt.verify(token, secret);

  if(pessoa && pessoa.id){
    var pessoaModel = require('./models/pessoa').model
    var conditions = { _id: pessoa.id }, update = { senha: password }, options = { multi: false };

    pessoaModel.update(conditions, update, options, (err, numAffected) => {
      if(err){
        return res.send(400, err)
      }
      // numAffected is the number of updated documents
      console.log(numAffected);
      res.send(200)
    });
  }else{
    res.send(400, 'invalid token')
  }
})

server.put('/change-password', function(req, res, next){
    const email = req.body.email;
    const senha = req.body.senha;
    console.log(email, senha);
    var pessoaModel = require('./models/pessoa').model
    var conditions = { email: email }, update = { senha: senha }, options = { multi: false };

    pessoaModel.update(conditions, update, options, callback);

    function callback (err, numAffected) {
      // numAffected is the number of updated documents
      console.log(numAffected);
    }
})

server.get('/singlePerson', function(req, res, next){
    const email = req.body.email;

    var pessoaModel = require('./models/pessoa').model
    pessoaModel.find({email}, function (err, docs) {
      // docs is an array
      docs[0] ? res.send(200, docs[0]) : res.send(401)
    });
    return next();
})

server.post('/sendMail', function(req, res, next){

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const email = req.body.email;
    const url = req.body.url;
    const subject = req.body.subject;

    const msg = {
      to: email,
      from: 'reset@voto360.com',
      subject: subject,
      text: text,
      html: '<strong>' + text + '</strong>',
    }

    sgMail.send(msg).then(response =>{
      console.log('Email enviado');
      window.location.href = "http://localhost:3000/login";
    })

})



server.listen(process.env.PORT || 8081, function () {
    console.log('%s listening at %s', server.name, server.url);
});
