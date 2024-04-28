const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  feedback: {
    type: String,
    required: true,
  },
  reference: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("contacts", contactSchema);
