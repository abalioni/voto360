module.exports.executa = (req, context, done) => {
  const condition = {_id: req.params.id_pesquisa };

  context.pesquisaModel.remove(condition, (err, pesquisa) => {
    if (err) {
      done(err);
    } else {
      done(null, pesquisa);
    }
  });
}