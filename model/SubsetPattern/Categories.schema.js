const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryname: { type: String },
  products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('Category', CategorySchema);
