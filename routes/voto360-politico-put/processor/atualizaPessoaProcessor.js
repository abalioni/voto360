module.exports.executa = function (query, context, callback) {
  var model = context.pessoaModel;

  var conditions = { cpf: query.cpf };
  var update = {
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