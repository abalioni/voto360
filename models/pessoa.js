var mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 22;

// Create a simple mongoose model 'Order'
var PessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true, index: true },
    senha: {type: String, required: true},
    email: { type: String, required: true, unique: true, index: true },
    cargo: { type: String, required: true },
    ind_ativo: { type: Number },
    data_nascimento: { type: Date },
    foto: { data: Buffer, contentType: String }

});

// PessoaSchema.pre('save', function(next) {
//   var user = this;
//   console.log(this);
//   console.log('pessoaschema');
//   if (!user.isModified('senha')) {
//     console.log("is isModified");
//     return next();
//   }
//
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//       console.log('err', err);
//       console.log('salt', err);
//         if (err) return next(err);
//
//         // hash the password using our new salt
//         bcrypt.hash(user.senha, salt, function(err, hash) {
//           console.log('salt2', salt);
//           console.log('err2', err);
//             if (err) return next(err);
//
//             // override the cleartext password with the hashed one
//             user.senha = hash;
//             console.log(user.senha);
//             next();
//         });
//     });
// })
//
// PessoaSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.senha, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

var Pessoa = mongoose.model('pessoas', PessoaSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = {
    resource: restifyMongoose(Pessoa),
    model: Pessoa
}
