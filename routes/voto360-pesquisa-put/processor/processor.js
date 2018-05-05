const atualizaPesquisa = require('./atualizaPesquisaProcessor')

module.exports.executa = function (query, context, done) {
  const moment = context.moment;
  
  var queryPesquisa = {
    "id": query.id
  };

  atualizaPesquisa.executa(queryPesquisa, context, function (err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data)
    }
  });
}