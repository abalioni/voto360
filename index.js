var restify = require('restify');


var mongoose = require('mongoose').set('debug', true);

var restifyMongoose = require('restify-mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voto360');

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
    pessoaModel.find({email, senha}, function (err, docs) {
      // docs is an array
      docs[0] ? res.send(200, docs[0]) : res.send(401)
    });
    return next();
})

server.put('/change-role', function(req, res, next){
    const email = req.body.email;
    const cargo = req.body.cargo;
    console.log(email, cargo);
    var pessoaModel = require('./models/pessoa').model
    var conditions = { email: email }, update = { cargo: cargo }, options = { multi: false };

    pessoaModel.update(conditions, update, options, callback);

    function callback (err, numAffected) {
      // numAffected is the number of updated documents
      console.log(numAffected);
    }
})

server.put('/change-token', function(req, res, next){
    const email = req.body.email;
    const token = req.body.token;
    console.log(email, token);
    var pessoaModel = require('./models/pessoa').model
    var conditions = { email: email }, update = { token: token }, options = { multi: false };

    pessoaModel.update(conditions, update, options, callback);

    function callback (err, numAffected) {
      // numAffected is the number of updated documents
      console.log(numAffected);
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

server.post('/singlePerson', function(req, res, next){
    const email = req.body.email;
    console.log('single person');
    var pessoaModel = require('./models/pessoa').model
    pessoaModel.find({email}, function (err, docs) {
      // docs is an array
      console.log('aaa');
      console.log(docs[0]);
      docs[0] ? res.send(200, docs[0]) : res.send(401)
    });
    return next();
})

server.post('/sendMail', function(req, res, next){
    const email = req.body.email;
    const url = req.body.url;
    const subject = req.body.subject;
    const from = req.body.from;
    console.log('send email');
    var SendGrid = require('./helpers/sendgrid')
    SendGrid.sendEmail(email, from, subject, url);

})

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
