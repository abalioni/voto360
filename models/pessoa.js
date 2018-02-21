var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var PessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true, index: true },
    senha: {type: String, required: true},
    email: { type: String, required: true, unique: true, index: true },
    ind_ativo: { type: Number },
    data_nascimento: { type: Date },
    foto: { data: Buffer, contentType: String }

});

var Pessoa = mongoose.model('pessoas', PessoaSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = {
    resource: restifyMongoose(Pessoa),
    model: Pessoa
}
