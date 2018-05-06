module.exports.executa = function (req, context, done) {
  const options = {
    new: true
  };
  let data = req.body || {};
  const model = new context.pesquisaModel(JSON.parse(data));

  model.save((err, pesquisa) => {
    if (err) {
      done(err);
    } else {
      done(null, pesquisa);
    }
  });
}