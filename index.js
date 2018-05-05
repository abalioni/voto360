require("dotenv").load();

var restify = require('restify');
var axios = require('axios');
var mongoose = require('mongoose').set('debug', true);
var restifyMongoose = require('restify-mongoose');
var jwt = require('jsonwebtoken')
var moment = require('moment');

const secret = 'shhhhhh';

const validate = require('./utils/validation');
const constants = require('./utils/constants');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voto360');

var emailBusiness = require('./business/email');

console.log(emailBusiness)
var server = restify.createServer({
  name: 'voto360',
  version: '1.0.0'
});

server.use(restify.plugins.CORS({ origins: ['*'] }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

server.get('/', function (req, res) {
  res.send("Voto360");
});

require('./models/pessoa').resource.serve('/pessoa', server);
require('./models/candidato').resource.serve('/candidato', server);
require('./models/eleitor').resource.serve('/eleitor', server);
require('./models/partido').resource.serve('/partido', server);
require('./models/dados_politico').resource.serve('/dados_politico', server);
require('./models/patrimonio').resource.serve('/patrimonio', server);
require('./models/projeto').resource.serve('/projeto', server);
require('./models/politico').resource.serve('/politico', server);
require('./models/pesquisa').resource.serve('/pesquisa', server);

server.get('api/pesquisa', (req, res, done) => {
  // TODO: Do you need any explanation? Srly?
});

server.post('api/pesquisa', (req, res, done) => {
  // TODO: Do you need any explanation? Srly?
});

server.put('api/pesquisa/:id_pesquisa', (req, res, done) => {
  // TODO: Do you need any explanation? Srly?
});

server.del('api/pesquisa/:id_pesquisa', (req, res, done) => {
  // TODO: Do you need any explanation? Srly?
});

server.put('api/pessoa/:id_pessoa/politico', (req, res, done) => {
  let model = require('./models/politico').model;
  let condition = { pessoa: req.params.id_pessoa };
  let infoUpdate = { biografia: req.body.biografia };

  model.update(condition, infoUpdate, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(200);
    }
  })
});

server.get('api/pessoa/:id_pessoa/politico', function (req, res, done) {
  const route = require('./routes/voto360-pessoa--id_pessoa--politico-get/index');
  const context = {
    "politicoModel": require('./models/politico').model,
    "validate": validate,
    "moment": moment
  };

  execute(route, req, res, context);
});

server.get('api/politico', function (req, res, done) {
  const route = require('./routes/voto360-politico-get/index')
  const context = {
    "validate": validate,
    "politicoModel": require('./models/politico').model,
    "moment": moment
  };

  var response;

  // Validate information of the request
  var validation = [];
  validation = route.validator(req.params, context);

  if (validation.length === 0) {
    route.controller(req.params, res, context, function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.send(validation);
  }
});

server.put('api/politico/:id_politico/ativar', function (req, res, next) {
  const route = require('./routes/voto360-politico--id_politico--ativar-put/index');
  const context = {
    "politicoModel": require('./models/politico').model,
    "pessoaModel": require('./models/pessoa').model,
    "validate": validate
  };

  execute(route, req.params, res, context);
});

server.put('api/politico/:id_politico/desativar', function (req, res, next) {
  let model = require('./models/politico').model;

  model.update({ _id: req.params.id_politico },
    { perfil_aprovado: 'deactivated' }, { multi: false }, function (err, numAffected) {
      if (err) {
        res.send(err)
      } else {
        res.send(200)
      }
    })
});

server.put('api/politico/:id_politico/rejeitar', function (req, res, next) {
  let model = require('./models/politico').model;

  model.update({ _id: req.params.id_politico },
    { perfil_aprovado: 'rejected' }, { multi: false }, function (err, numAffected) {
      if (err) {
        res.send(err)
      } else {
        res.send(200)
      }
    })
});

server.put('api/politico', function (req, res, next) {
  const route = require('./routes/voto360-politico-put/index');
  const context = {
    "validate": validate,
    "moment": moment,
    "politicoModel": require('./models/politico').model,
    "pessoaModel": require('./models/pessoa').model
  };

  execute(route, req.body, res, context);
});

server.post('/login', function (req, res, next) {
  const email = req.body.email;
  const senha = req.body.senha;
  var pessoaModel = require('./models/pessoa').model

  pessoaModel.find({ email }, function (err, docs) {
    // docs is an array
    if (!docs[0]) {
      return res.send(401)
    }
    const validPassword = docs[0].verifySenhaSync(senha);
    validPassword ? res.send(200, docs[0]) : res.send(401)
  });
  return next();
})

server.get('/reset/:token', function (req, res, next) {
  const token = req.param.token
  console.log(req.param("token"));
  console.log(req.param.token);
  console.log(token);
  axios.get('http://localhost:8080/pessoa?q=', {
    token: token
  })
    .then(function (res) {
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
    .then(function (res) {

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

server.put('/change-role', function (req, res, next) {
  const email = req.body.email;
  const cargo = req.body.cargo;
  console.log(email, cargo);
  var pessoaModel = require('./models/pessoa').model
  var conditions = { email: email }, update = { cargo: cargo }, options = { multi: false };

  pessoaModel.update(conditions, update, options, callback);

  function callback(err, numAffected) {
    if (err) {
      return res.send(400, err)
    }
    // numAffected is the number of updated documents
    console.log(numAffected);
    res.send(200)
  }
  return next();
})

server.put('/change-info', function (req, res, next) {
  const email = req.body.email;
  const newemail = req.body.newemail;
  const cpf = req.body.cpf;
  const senhaatual = req.body.senhaatual;
  const senha = req.body.senha;
  const nome = req.body.nome;

  var pessoaModel = require('./models/pessoa').model

  var conditions = { email: email };
  var options = { multi: false }
  var update = {}

  // email: newemail, cpf: cpf, senha: senha, nome: nome }, ;

  if (newemail) {
    update.email = newemail;
  }

  if (cpf) {
    update.cpf = cpf;
  }

  if (senha) {
    update.senha = senha;
  }

  if (nome) {
    update.nome = nome;
  }

  console.log(update)

  pessoaModel.find({ email }, function (err, docs) {


    if (err || !docs[0]) {
      console.log("################ err")
      console.log(err || docs)
      return res.send(401)
    }

    if (senhaatual) {
      const equalsPassword = docs[0].verifySenhaSync(senhaatual);

      console.log("################ equals")
      console.log(equalsPassword)
      if (!equalsPassword) {
        return res.send(401, "Senha deve ser diferente da atual")
      }
    }
    pessoaModel.update(conditions, update, options, callback);

    function callback(err2, numAffected) {
      if (err2) {
        return res.send(400, err2)
      }
      res.send(200)
    }
  });


  return next();
})

server.put('/change-token', function (req, res, next) {
  const email = req.body.email;
  const token = req.body.token;
  console.log(email, token);
  var pessoaModel = require('./models/pessoa').model
  var conditions = { email: email }, update = { senha: token }, options = { multi: false };

  pessoaModel.update(conditions, update, options, callback);

  function callback(err, numAffected) {
    var request = {
      email: req.body.email,
      subject: 'Solicitação de reset de senha',
      text: 'Essa é sua nova senha: ' + token,
    };

    axios.post('http://localhost:8081/sendMail', request).then((response) => console.log(response)).catch(function (error) {
      alert(error);
    });
  }
})

server.post('/change-password', function (req, res, next) {
  const email = req.body.email;
  var pessoaModel = require('./models/pessoa').model
  pessoaModel.findOne({ email })
    .then(pessoa => { return pessoa })
    .then((pessoa) => emailBusiness.resetPassword(email, jwt.sign({ id: pessoa._id }, secret)))
    .then(() => res.send(200))
    .catch(err => { console.log(err); res.send(400, err) })
  return next();
})

server.post('/verify-change-password-token', function (req, res, next) {
  const { password, token } = req.body;
  console.log(req.body);
  const pessoa = jwt.verify(token, secret);

  if (pessoa && pessoa.id) {
    var pessoaModel = require('./models/pessoa').model
    var conditions = { _id: pessoa.id }, update = { senha: password }, options = { multi: false };

    pessoaModel.update(conditions, update, options, (err, numAffected) => {
      if (err) {
        return res.send(400, err)
      }
      // numAffected is the number of updated documents
      console.log(numAffected);
      res.send(200)
    });
  } else {
    res.send(400, 'invalid token')
  }
})

server.put('/change-password', function (req, res, next) {
  const email = req.body.email;
  const senha = req.body.senha;
  console.log(email, senha);
  var pessoaModel = require('./models/pessoa').model
  var conditions = { email: email }, update = { senha: senha }, options = { multi: false };

  pessoaModel.update(conditions, update, options, callback);

  function callback(err, numAffected) {
    // numAffected is the number of updated documents
    console.log(numAffected);
  }
})

server.get('/singlePerson', function (req, res, next) {
  const email = req.body.email;

  var pessoaModel = require('./models/pessoa').model
  pessoaModel.find({ email }, function (err, docs) {
    // docs is an array
    docs[0] ? res.send(200, docs[0]) : res.send(401)
  });
  return next();
})

server.post('/sendMail', function (req, res, next) {

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

  sgMail.send(msg).then(response => {
    console.log('Email enviado');
    window.location.href = "http://localhost:3000/login";
  })

})

server.post('/sendCommonEmail', function (req, res, next) {

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(req)
  // const email = req.body.email;
  const email = 'balionisalexia@gmail.com';
  const url = req.body.url;
  const subject = req.body.subject;
  const html = req.body.html;

  const msg = {
    to: email,
    from: 'noreply@voto360.com',
    subject: subject,
    html: html,
  }

  console.log("msg", msg)

  sgMail.send(msg).then(response => {
    console.log('Email enviado');
    // window.location.href = "http://localhost:3000/login";
  })

})

function execute(route, req, res, context) {
  route.validator(req, context, (err) => {
    if (err.length) {
      res.send(getError(err));
    } else {
      route.controller(req, context, (err, data) => {
        if (err) {
          res.send(getError(err));
        } else {
          res.send(data);
        }
      });
    }
  });
}

function getError(errorList, errorCode) {
  return {
    'error_code': errorCode ? errorCode : '',
    'error': errorList
  };
}

server.listen(process.env.PORT || 8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});
