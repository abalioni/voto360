var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var PoliticoSchema = new mongoose.Schema({
    pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'pessoas' },
    // partido: { type: mongoose.Schema.Types.ObjectId, ref: 'partido' },
    partido: { type: String, required: true },
    cnpj: { type: Number },
    data_nascimento: {type: Date},
    email_eleitoral: { type: String, required: true },
    estado: { type: String, required: true },
    nome_eleitoral: { type: String, required: true },
    despesa_campanha: { type: Number },
    escolaridade: { type: String, required: true },
    qtd_votos: { type: Number },
    data_eleito: { type: Date },
    numero_candidato: { type: Number },
    qtd_intencao_votos: { type: Number },
    biografia: { type: String },
    cargo_politico: { type: String },
    perfil_aprovado: { type: String, required: true }
});

var Politico = mongoose.model('politicos', PoliticoSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = {
    resource: restifyMongoose(Politico),
    model: Politico
}
