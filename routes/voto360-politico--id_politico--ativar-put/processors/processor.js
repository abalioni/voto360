module.exports.executa = function (req, context, done) {
  let modelPolitico = context.politicoModel;
  let modelPessoa = context.pessoaModel;

  let politicoCondition = { _id: req.id_politico };
  let politicoData = { perfil_aprovado: 'approved' };

  modelPolitico.update(politicoCondition, politicoData, { multi: false }, function (err, updatedDocPolitico) {
    if (err) {
      done(err);
    } else {
      if (updatedDocPolitico && updatedDocPolitico.ok > 0) {
        modelPolitico
          .findOne(politicoCondition)
          .populate('pessoa')
          .exec(function (err, politico) {
            if (err) {
              done(err);
            } else {
              let pessoaCondition = { "_id": politico.pessoa.id };
              let pessoaData = { cargo: "politico" };
              modelPessoa.update(pessoaCondition, pessoaData, {multi: false}, function(err, updateDocPessoa) {
                if (err) {
                  done(err);
                } else {
                  done(null, getResponse(updateDocPessoa, updatedDocPolitico));
                }
              });
            }
          });
      }
    }
  });
}

function getResponse(pessoaUpdated, politicoUpdated) {
  return {
    "pessoasUpdated": pessoaUpdated,
    "politicosUpdated": politicoUpdated
  };
}