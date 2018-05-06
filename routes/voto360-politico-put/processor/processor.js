const atualizaPessoa = require('./atualizaPessoaProcessor')
const atualizaPolitico = require('./atualizaPoliticoProcessor')

module.exports.executa = function (query, context, done) {
  const moment = context.moment;
  
  var queryPessoa = {
    "cpf": query.cpf,
    "data_nascimento": query.data_nascimento
  };
  //moment(query.data_nascimento, "DD/MM/YYYY").toDate()

  atualizaPessoa.executa(queryPessoa, context, function (err, data) {
    if (err) {
      done(err);
    } else {
      var queryPolitico = {
        "cpf": query.cpf,
        "nome_eleitoral": query.nome_eleitoral,
        "email_eleitoral": query.email_eleitoral,
        "data_nascimento": query.data_nascimento,
        "partido": query.partido,
        "estado": query.estado,
        "biografia": query.biografia,
        "escolaridade": query.escolaridade,
        "perfil_aprovado": query.perfil_aprovado
      };

      atualizaPolitico.executa(queryPolitico, context, function(err, data) {
        if (err) {
          done(err);
        } else {
          done(null, data);
        }
      });
    }
  });
}