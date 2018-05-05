module.exports.executa = function (query, context, done) {
  var model = context.politicoModel;
  var moment = context.moment;

  if (query.data_nascimento) {
    query.data_nascimento = moment(query.data_nascimento, "dd/MM/YYYY").toDate();
  }
  var condition = getFiltro(query);

  model.find(condition, function (err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
}

function getFiltro(query) {
  var filtro = {};

  if (query.nome_eleitoral) {
    var regexNome = new RegExp("^" + query.nome_eleitoral);
    filtro.nome_eleitoral = regexNome;
  }

  if (query.partido) {
    filtro.partido = query.partido;
  }

  if (query.cnpj) {
    filtro.cnpj = query.cnpj;
  }

  if (query.data_nascimento) {
    filtro.data_nascimento = query.data_nascimento;
  }

  if (query.email_eleitoral) {
    filtro.email_eleitoral = query.email_eleitoral;
  }

  if (query.estado) {
    filtro.estado = query.estado;
  }

  if (query.despesa_campanha) {
    filtro.despesa_campanha = query.despesa_campanha;
  }

  if (query.escolaridade) {
    filtro.escolaridade = query.escolaridade;
  }

  if (query.cargo_politico) {
    filtro.cargo_politico = query.cargo_politico;
  }

  if (query.perfil_aprovado) {
    filtro.perfil_aprovado = query.perfil_aprovado;
  }

  return filtro;
}