var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
// Create a simple mongoose model 'Pesquisa'
var PesquisaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: false },

    // Enum if three possible values: CRIADA/ANDAMENTO/FINALIZADA
    estado: { type: String, required: true, default: 'CRIADA' },
    politicos: [{
        politico: { type: mongoose.Schema.Types.ObjectId, ref: 'politicos' },
        votos: Number
    }],
    created: { type: Date, default: Date.now }
});

var Pesquisa = mongoose.model('pesquisas', PesquisaSchema);
// Now create a restify-mongoose resource from 'Pesquisa' mongoose model
module.exports = {
    resource: restifyMongoose(Pesquisa),
    model: Pesquisa
}
