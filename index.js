var restify = require('restify');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voto360');

var server = restify.createServer({
    name: 'voto360',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());


server.get('/', function (req, res) {
    res.send("Voto360")
});

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

var pessoa = require('./models/pessoa')
server.get('/pessoa', pessoa.query());
server.get('/ pessoa/:id', pessoa.detail());
server.post('/ pessoa', pessoa.insert());
server.patch('/ pessoa/:id', pessoa.update());
server.del('/ pessoa/:id', pessoa.remove());
