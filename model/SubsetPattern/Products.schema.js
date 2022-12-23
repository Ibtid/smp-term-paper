const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String },
  actor: { type: String },
  price: { type: Number },
  special: { type: Number },
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  lastTenReview: [
    {
      review: { type: String },
      review_id: { type: mongoose.Types.ObjectId, ref: 'Review' },
      customer_id: { type: mongoose.Types.ObjectId, ref: 'Customer' },
    },
  ],
});

module.exports = mongoose.model('Product', ProductSchema);
