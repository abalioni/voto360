var mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var PessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true, index: true },
    senha: {type: String, required: true, bcrypt: true},
    email: { type: String, required: true, unique: true, index: true },
    cargo: { type: String, required: true },
    ind_ativo: { type: Number },
    data_nascimento: { type: Date },
    foto: { data: Buffer, contentType: String }

});
PessoaSchema.plugin(require('mongoose-bcrypt'));
var Pessoa = mongoose.model('pessoas', PessoaSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = {
    resource: restifyMongoose(Pessoa),
    model: Pessoa
}
