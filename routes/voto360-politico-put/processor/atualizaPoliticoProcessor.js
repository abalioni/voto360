module.exports.executa = function (query, context, callback) {
  var model = new context.politicoModel();
  var modelPessoa = context.pessoaModel;

  modelPessoa.findOne({ cpf: query.cpf }, function (err, pessoa) {
    if (err) {
      callback(err);
    } else {
      if (pessoa) {
        model.pessoa = pessoa;
        model.partido = query.partido;
        model.escolaridade = "";
        model.qtd_votos = 0;
        model.numero_candidato = 0;
        model.biografia = query.biografia;
      
        model.save(err => {
          if (err) {
            callback(err);
          } else {
            callback(null, model)
          }
        });
      }
    }
  });
}