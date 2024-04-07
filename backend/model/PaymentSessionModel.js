// models/PaymentSession.js
const mongoose = require('mongoose');

const paymentSessionSchema = new mongoose.Schema({
  sessionID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  reference: String, // Optional initially, will be updated once payment is initiated
}, { timestamps: true });

module.exports = mongoose.model('PaymentSession', paymentSessionSchema);
