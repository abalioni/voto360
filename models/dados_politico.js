var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var DadosPoliticoSchema = new mongoose.Schema({
    ind_ficha_limpa: { type: String, required: true },
    politico: { type: mongoose.Schema.Types.ObjectId, ref: 'politicos' },
    data_presenca: { type: Date, required: true },
    qtd_projetos_apresentados: { type: Number, required: true },
    qtd_projetos_aprovados: { type: Number, required: true },
    qtd_projetos_rejeitados: { type: Number, required: true }

});

var DadosPolitico = mongoose.model('dadospoliticos', DadosPoliticoSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = {
    resource: restifyMongoose(DadosPolitico),
    model: DadosPolitico
}
