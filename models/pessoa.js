var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var PessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    ind_ativo: { type: Number, required: true },
    data_nascimento: { type: Date, required: true },
    foto: { data: Buffer, contentType: String }

});

var Pessoa = mongoose.model('pessoas', PessoaSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = restifyMongoose(Pessoa);
