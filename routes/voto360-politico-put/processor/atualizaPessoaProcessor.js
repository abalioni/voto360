module.exports.executa = function (query, context, callback) {
  var model = context.pessoaModel;

  var conditions = { cpf: query.cpf };
  var update = {
    nome: query.nome_eleitoral,
    email: query.email_eleitoral,
    data_nascimento: query.data_nascimento
  }
  var options = { multi: false };

  model.update(conditions, update, options, function(err, numAffected) {
    if (err) {
      callback(err);
    } else {
      callback(null, numAffected);
    }
  });
}