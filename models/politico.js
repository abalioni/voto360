var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var PoliticoSchema = new mongoose.Schema({
    pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'pessoas' },
    partido: { type: String, required: true },
    despesa_campanha: { type: Number, required: true },
    escolaridade: { type: String, required: true },
    qtd_votos: { type: Number, required: true },
    data_eleito: { type: Date },
    numero_candidato: { type: Number, required: true },
    qtd_intencao_votos: { type: Number },
    biografia: { type: String },
    cargo: { type: String }
});

var Politico = mongoose.model('politicos', PoliticoSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = {
    resource: restifyMongoose(Politico),
    model: Politico
}
