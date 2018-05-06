module.exports.executa = (req, context, done) => {
  if(req.params.id_pesquisa) {
    const condition = {_id: req.params.id_pesquisa };
    context.pesquisaModel
      .findOne(condition)
      .populate('politicos.politico')
      .exec((err, pesquisa) => {
        if (err) {
          done(err);
        } else {
          done(null, pesquisa);
        }
      });
  } else {
    context.pesquisaModel.find({})
    .populate('politicos.politico')
    .exec((err, pesquisa) => {
      if (err) {
        done(err);
      } else {
        done(null, pesquisa);
      }
    });
  }
}