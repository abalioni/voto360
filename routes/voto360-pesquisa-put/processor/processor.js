module.exports.executa = function (req, context, done) {
  const model = new context.pesquisaModel();
  const options = {
    new: true
  };
  let data = req.body || {};

  if (!data._id) {
    data = Object.assign({}, data, { _id: req.params.id_pesquisa });
  }

  model.findByIdAndUpdate(data._id, data, options, function (err, pesquisa) {
    if (err) {
      done(err);
    } else {
      done(null, pesquisa);
    }
  });
}