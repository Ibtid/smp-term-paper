const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  review: { type: String },
  product: { type: mongoose.Types.ObjectId, ref: 'Product' },
  customer: { type: mongoose.Types.ObjectId, ref: 'Customer' },
});

module.exports = mongoose.model('Review', ReviewSchema);
