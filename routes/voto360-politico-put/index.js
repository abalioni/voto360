const processor = require("./processor/processor")

module.exports.validator = function (req, context, done) {
  let validation = [];

  // Valida se a pessoa já é um político
  let pessoaModel = context.pessoaModel;
  let conditionPolitico = { 'pessoa.cpf': req.cpf };

  politicoModel.findOne(conditionPolitico, (err, data) => {
    if (data) {
      validation.push({
        "error": "O usuário já possui um perfil político."
      });
      done(validation);
    }
  });
};

module.exports.controller = function (req, context, callback) {
  processor.executa(req, context, function (err, data) {
    if (err) {
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