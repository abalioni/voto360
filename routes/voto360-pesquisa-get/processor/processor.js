module.exports.executa = (req, context, done) => {
  if(req.params.id_pesquisa) {
    const condition = {_id: req.params.id_pesquisa };
    context.pesquisaModel.findOne(condition, (err, pesquisa) => {
      if (err) {
        done(err);
      } else {
        done(null, pesquisa);
      }
    });
  } else {
    context.pesquisaModel.find({}, (err, pesquisa) => {
      if (err) {
        done(err);
      } else {
        done(null, pesquisa);
      }
    });
  }
}