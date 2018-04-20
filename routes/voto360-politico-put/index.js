const processor = require("./processor/processor")

module.exports.validator = function(req, context) {
  // TODO: Implementar validação dos campos
  var validation = [];

  return validation;
};

module.exports.controller = function(req, res, context, callback) {
  processor.executa(req, context, function(err, data) {
    if(err) {
      callback(err);
    } else {
      callback(null, formatarResposta(data));
    }
  });
};

function formatarResposta(data) {
  return {
    "cnpj": data.cnpj,
    "nome_eleitoral": data.nome_eleitoral,
    "email_eleitoral": data.email_eleitoral,
    "partido": data.partido,
    "data_nascimento": data.data_nascimento,
    "estado": data.estado,
    "escolaridade": data.escolaridade,
    "biografia": data.biografia,
    "perfil_aprovado": data.perfil_aprovado
  }
}