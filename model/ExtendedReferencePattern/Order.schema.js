const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderdate: { type: Date, default: Date.now },
  netamount: { type: Number },
  taxonomy: { type: Number },
  totalamount: { type: Number },
  products: [
    {
      name: { type: String },
      price: { type: Number },
      prod_id: { type: mongoose.Types.ObjectId, ref: 'Product' },
    },
  ],
  customer: {
    name: { type: String },
    address1: { type: String },
    address2: { type: String },
    cust_id: { type: mongoose.Types.ObjectId, ref: 'Customer' },
  },
});

module.exports = mongoose.model('Order', OrderSchema);
