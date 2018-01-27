var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');

// Create a simple mongoose model 'Order'
var ProjetoSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    qtd_votos_favor: { type: Number, required: true },
    qtd_votos_contra: { type: Number, required: true },
    ind_aprovado: { type: String },

    // customer: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
    // gateway: { type: mongoose.Schema.Types.ObjectId, ref: 'gateways' },
    // //0-Unpaid; 1-Paid; 2-Dispatched; 3-Processing; 4-Refunded; 5-Cancelled; 6-Failed; 7-Declined; 8-Mismatch; 9-Partially Refunded
    // status: { type: Number, required: true },
    // subtotal: { type: Number, required: true },
    // shippingprice: { type: Number },
    // total: { type: Number, required: true },
    // // currency: { type: mongoose.Schema.Types.ObjectId, ref: 'currencies', required: true },
    // currencyCode: { type: Number, required: true, default: 55 },
    // company: { type: String },
    // exchangeRate: { type: Number, required: true },
    // shipping: { type: mongoose.Schema.Types.ObjectId, ref: 'shippings' }
});

var Projeto = mongoose.model('projetos', ProjetoSchema);
// Now create a restify-mongoose resource from 'Order' mongoose model
module.exports = restifyMongoose(Projeto);
