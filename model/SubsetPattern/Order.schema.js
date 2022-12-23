const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderdate: { type: Date, default: Date.now },
  netamount: { type: Number },
  taxonomy: { type: Number },
  totalamount: { type: Number },
  products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  customer: { type: mongoose.Types.ObjectId, ref: 'Customer' },
});

module.exports = mongoose.model('Order', OrderSchema);
