const atualizaPessoa = require('./atualizaPessoaProcessor')
const atualizaPolitico = require('./atualizaPoliticoProcessor')

module.exports.executa = function (query, context, done) {
  const moment = context.moment;
  
  var queryPessoa = {
    "cpf": query.cpf,
    "data_nascimento": moment(query.data_nascimento, "DD/MM/YYYY").toDate(),
    "email_eleitoral": query.email_eleitoral,
    "nome_eleitoral": query.nome_eleitoral
  };

  atualizaPessoa.executa(queryPessoa, context, function (err, data) {
    if (err) {
      done(err);
    } else {
      var queryPolitico = {
        "cpf": query.cpf,
        "partido": query.partido,
        "biografia": query.biografia
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