const processor = require("./processor/processor")

module.exports.validator = function(req, context) {
  // TODO: Implementar validação dos campos
  var validation = [];

  return validation;
};

module.exports.controller = function(req, res, context, callback) {
  processor.executa(req, context, function(err, data) {
    if(err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};