module.exports.executa = function (req, context, done) {
  const options = {
    new: true
  };
  let data = req.body || {};
  const model = new context.pesquisaModel(data);

  model.save(function (err, pesquisa) {
    if (err) {
      done(err);
    } else {
      done(null, pesquisa);
    }
  });
}