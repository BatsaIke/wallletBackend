const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  reference: {
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
  paymentStatus: {
    type: String, // Use String instead of Boolean
    default: 'pending', // Default value is 'pending'
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  tokenValue: {
    type: String,
    validate: {
      validator: function (v) {
        // Validate that the tokenValue is a 5-digit alphanumeric string
        return /^[0-9A-Za-z]{5}$/.test(v);
      },
      message: props => `${props.value} is not a valid 5-digit alphanumeric string!`,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const BalanceSchema = new mongoose.Schema({
  totalBalance: {
    type: Number,
    default: 0,
  },
  actualBalance: {
    type: Number,
    default: 0,
  },
});   

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  payments: [PaymentSchema],
  balance: BalanceSchema, // Add the balance field using the BalanceSchema
});

module.exports = User = mongoose.model("user", UserSchema);
module.exports = User = mongoose.model("user", UserSchema);
