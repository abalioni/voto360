const mongoose = require('mongoose');
const restifyMongoose = require('restify-mongoose');
// Create a simple mongoose model 'Pesquisa'
const PesquisaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: false },

    // Enum if three possible values: CRIADA/ANDAMENTO/FINALIZADA
    estado: { type: String, required: true, default: 'CRIADA' },
    politicos: [{
        politico: { type: mongoose.Schema.Types.ObjectId, ref: 'politicos' },
        votos: { type: Number, default: 0 },
    }],
    created: { type: Date, default: Date.now }
});

const Pesquisa = mongoose.model('pesquisas', PesquisaSchema);
// Now create a restify-mongoose resource from 'Pesquisa' mongoose model
module.exports = {
    resource: restifyMongoose(Pesquisa),
    model: Pesquisa
}
