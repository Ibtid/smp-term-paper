const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  region: { type: Number },
  email: { type: String },
  creditcardtype: { type: String },
  creditcard: { type: String },
  creditcardexpiration: { type: String },
  username: { type: String },
  password: { type: String },
  income: { type: String },
  genders: { type: String },
});

module.exports = mongoose.model('Customer', CustomerSchema);
