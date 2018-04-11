var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'PerfilPoliticoPendente'
var PerfilPoliticoPendente = new mongoose.Schema({
    id_pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'pessoas' }, // ID da pessoa que está cadastrada no model pessoa
    nome_eleitoral: { type: mongoose.Schema.Types.ObjectId, ref: 'pessoas' },
    email_eleitoral: { type: String, required: true },
    despesa_campanha: { type: Number, required: true },
    escolaridade: { type: String, required: true },
    qtd_votos: { type: Number, required: true },
    data_eleito: { type: Date },
    numero_candidato: { type: Number, required: true },
    qtd_intencao_votos: { type: Number },
    biografia: { type: String },
    cargo: { type: String }
});

var PerfilPoliticoPendente = mongoose.model('PerfisPoliticosPendentes', PerfilPoliticoPendenteSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = {
    resource: restifyMongoose(PerfilPoliticoPendente),
    model: PerfilPoliticoPendente
}
