// models/AffiliateModel.js

const mongoose = require("mongoose");

const affiliateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  products: {
    type: [String],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Affiliate", affiliateSchema);
