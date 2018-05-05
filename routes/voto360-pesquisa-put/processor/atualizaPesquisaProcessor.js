module.exports.executa = function (query, context, callback) {
  var model = new context.pesquisaModel();
  var modelPesquisa = context.pesquisaModel;

  modelPesquisa.findOne({ _id: new  query.id }, function (err, pesquisa) {
    if (err) {
      callback(err);
    } else {
      if (pesquisa) {

        model.titulo = query.titulo;
        model.pesquisa = query.pesquisa;
        model.estado = query.estado;
        model.politicos = query.politicos;

        model.save(err => {
          if (err) {
            callback(err);
          } else {
            callback(null, model);
          }
        });
      } else {
        callback({"erro": "Pesquisa não encontrada."})
      }
    }
  });
}