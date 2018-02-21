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

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});