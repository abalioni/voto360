var restify = require('restify');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voto360');

var server = restify.createServer({
    name: 'voto360',
    version: '1.0.0'
});

server.use(restify.authorizationParser());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());


server.get('/', function (req, res) {
    res.send("Voto360")
});

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});