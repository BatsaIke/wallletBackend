const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
       public_id: {
           type: String,
           required: true
       },
       url: {
           type: String,
           required: true
       }
   
   },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true, // Ensure SKU is unique across all products
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
