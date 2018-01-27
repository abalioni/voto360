var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var PatrimonioSchema = new mongoose.Schema({
    politico: { type: mongoose.Schema.Types.ObjectId, ref: 'politicos' },
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },

});

var Patrimonio = mongoose.model('patrimonios', PatrimonioSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = restifyMongoose(Patrimonio);
