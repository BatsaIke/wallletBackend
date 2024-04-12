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
    type: String,
    default: 'pending',
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

function generateUniqueToken() {
  // Generate a unique token with the format 'TkXXXXX' (e.g., 'Tkabc12')
  const prefix = 'Tk';
  let randomString;

  // Keep generating a random string until it meets the validation criteria
  do {
    randomString = Math.random().toString(36).substring(2, 7);
  } while (!/^[0-9A-Za-z]{5}$/.test(prefix + randomString));

  return prefix + randomString;
}



const BalanceSchema = new mongoose.Schema({
  totalBalance: {
    type: Number,
    default: 0,
  },
  tokenValue: {
    type: Number,
    default: 0.000,
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
    
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: 'user', enum: ['user', 'moderator', 'admin'] },

  tokenDigit: {
    type: String,
    default: "",
    unique: true,
  
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  payments: [PaymentSchema],
  balance: BalanceSchema,
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

