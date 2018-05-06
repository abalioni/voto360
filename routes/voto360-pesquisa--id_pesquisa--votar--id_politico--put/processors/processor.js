module.exports.executa = function (req, context, done) {
  const model = context.pesquisaModel;

  let condition = {
    "_id": req.id_pesquisa,
    "politicos.politico": req.id_politico
  };
  let data = {
    $inc: { "politicos.$.votos": 1 }
  };

  model.update(condition, data, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}