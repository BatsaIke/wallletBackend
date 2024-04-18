// models/PaymentSession.js
const mongoose = require("mongoose");

const paymentSessionSchema = new mongoose.Schema(
  {
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
    reference: { type: String, required: true, },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentSession", paymentSessionSchema);
