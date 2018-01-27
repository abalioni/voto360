var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var PartidoSchema = new mongoose.Schema({
    nome_partido: { type: String, required: true },
    sigla_partido: { type: String, required: true },
    qtd_politicos: { type: Number }

});

var Partido = mongoose.model('partidos', PartidoSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = restifyMongoose(Partido);
