module.exports.executa = function (query, context, callback) {
  var model = new context.politicoModel();
  var modelPessoa = context.pessoaModel;

  modelPessoa.findOne({ cpf: query.cpf }, function (err, pessoa) {
    if (err) {
      callback(err);
    } else {
      if (pessoa) {
        model.pessoa = pessoa._id;

        model.nome_eleitoral = query.nome_eleitoral;
        model.email_eleitoral = query.email_eleitoral;
        model.data_nascimento = query.data_nascimento;
        model.partido = query.partido;
        model.estado = query.estado;
        model.escolaridade = query.escolaridade;
        model.qtd_votos = 0;
        model.numero_candidato = 0;
        model.biografia = query.biografia;
        model.perfil_aprovado = query.perfil_aprovado;

        model.save(err => {
          if (err) {
            callback(err);
          } else {
            callback(null, model);
          }
        });
      } else {
        callback({"erro": "Pessoa não encontrada."})
      }
    }
  });
}