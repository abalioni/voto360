module.exports.executa = function (req, context, done) {
  const model = context.politicoModel;
  let condition = { pessoa: req.id_pessoa };

  model.findOne(condition, (err, data) => {
    if (err) {
      done(err);
    } else {
      done(null, data ? data : {
        id_pessoa: req.id_pessoa,
        biografia: data.biografia,
        partido: data.partido,
        cnpj: data.cnpj,
        data_nascimento: data.data_nascimento,
        email_eleitoral: data.email_eleitoral,
        estado: data.estado,
        nome_eleitoral: data.nome_eleitoral,
        despesa_campanha: data.despesa_campanha,
        escolaridade: data.escolaridade,
        qtd_votos: data.qtd_votos,
        data_eleito: data.data_eleito,
        numero_candidato: data.numero_candidato,
        qtd_intencao_votos: data.qtd_intencao_votos,
        biografia: data.biografia,
        cargo_politico: data.cargo_politico,
        perfil_aprovado: data.perfil_aprovado
      });
    }
  });
}