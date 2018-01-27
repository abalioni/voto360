var restify = require('restify');


var mongoose = require('mongoose');

var restifyMongoose = require('restify-mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voto360');

var server = restify.createServer({
    name: 'voto360',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({
  mapParams: true
}));

server.use(restify.plugins.bodyParser({
  mapParams: true
}));

server.get('/', function (req, res) {
    res.send("Voto360")
});

var NoteSchema = new mongoose.Schema({
    title : { type : String, required : true },
    tags : [String],
    content : { type: String }
});

var Note = mongoose.model('notes', NoteSchema);

// Now create a restify-mongoose resource from 'Note' mongoose model
var notes = restifyMongoose(Note);

// Serve resource notes with fine grained mapping control
server.get('/notes', notes.query());
server.get('/notes/:id', notes.detail());
server.post('/notes', notes.insert());
server.patch('/notes/:id', notes.update());
server.del('/notes/:id', notes.remove());

var pessoa = require('./models/pessoa')
server.get('/pessoa', pessoa.query());
server.get('/pessoa/:id', pessoa.detail());
server.post('/pessoa', pessoa.insert());
server.patch('/pessoa/:id', pessoa.update());
server.del('/pessoa/:id', pessoa.remove());

var candidato = require('./models/candidato')
server.get('/candidato', candidato.query());
server.get('/candidato/:id', candidato.detail());
server.post('/candidato', candidato.insert());
server.patch('/candidato/:id', candidato.update());
server.del('/candidato/:id', candidato.remove());

var eleitor = require('./models/eleitor')
server.get('/eleitor', eleitor.query());
server.get('/eleitor/:id', eleitor.detail());
server.post('/eleitor', eleitor.insert());
server.patch('/eleitor/:id', eleitor.update());
server.del('/eleitor/:id', eleitor.remove());

var partido = require('./models/partido')
server.get('/partido', partido.query());
server.get('/partido/:id', partido.detail());
server.post('/partido', partido.insert());
server.patch('/partido/:id', partido.update());
server.del('/partido/:id', partido.remove());

var dados_politico = require('./models/dados_politico')
server.get('/dados_politico', dados_politico.query());
server.get('/dados_politico/:id', dados_politico.detail());
server.post('/dados_politico', dados_politico.insert());
server.patch('/dados_politico/:id', dados_politico.update());
server.del('/dados_politico/:id', dados_politico.remove());

var patrimonio = require('./models/patrimonio')
server.get('/patrimonio', patrimonio.query());
server.get('/patrimonio/:id', patrimonio.detail());
server.post('/patrimonio', patrimonio.insert());
server.patch('/patrimonio/:id', patrimonio.update());
server.del('/patrimonio/:id', patrimonio.remove());

var projeto = require('./models/projeto')
server.get('/projeto', projeto.query());
server.get('/projeto/:id', projeto.detail());
server.post('/projeto', projeto.insert());
server.patch('/projeto/:id', projeto.update());
server.del('/projeto/:id', projeto.remove());

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
