var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
// Create a simple mongoose model 'Candidato'
var CandidatoSchema = new mongoose.Schema({
    pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'pessoas' },
    partido: { type: mongoose.Schema.Types.ObjectId, ref: 'partidos' },
    qtd_intencao_votos: { type: Number, required: true}
});

var Candidato = mongoose.model('candidatos', CandidatoSchema);
// Now create a restify-mongoose resource from 'Candidato' mongoose model
module.exports = {
    resource: restifyMongoose(Candidato),
    model: Candidato
}
