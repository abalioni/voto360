module.exports.executa = (req, context, done) => {
  const options = {
    new: true
  };

  let data = req.body || {};

  if (!data._id) {
    data = Object.assign({}, data, { _id: req.params.id_pesquisa });
  }

  context.pesquisaModel.findByIdAndUpdate(data._id, data, options, (err, pesquisa) => {
    if (err) {
      done(err);
    } else {
      done(null, pesquisa);
    }
  });
}