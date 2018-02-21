var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
// Create a simple mongoose model 'Eleitor'
var EleitorSchema = new mongoose.Schema({
    pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'pessoas' },
    politico_favorito: { type: mongoose.Schema.Types.ObjectId, ref: 'politicos' },
    posicao_politica: { type: String, required: true }
});

var Eleitor = mongoose.model('eleitores', EleitorSchema);
// Now create a restify-mongoose resource from 'Eleitor' mongoose model
module.exports = {
    resource: restifyMongoose(Eleitor),
    model: Eleitor
}
