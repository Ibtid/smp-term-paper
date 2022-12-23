const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String },
  actor: { type: String },
  price: { type: Number },
  special: { type: Number },
  category: {
    title: { type: String },
    cat_id: { type: mongoose.Types.ObjectId, ref: 'Category' },
  },
});

module.exports = mongoose.model('Product', ProductSchema);
