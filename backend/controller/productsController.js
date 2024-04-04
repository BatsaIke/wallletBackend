const Product = require('../model/ProductModel');

exports.createProduct = async (req, res) => {
    const { name, category, image, price, quantity, sku } = req.body;
  
    try {
      // Check if a product with the same SKU already exists
      const existingProduct = await Product.findOne({ sku });
      if (existingProduct) {
        return res.status(400).json({ msg: 'A product with this SKU already exists' });
      }
  
      const newProduct = new Product({
        name,
        category,
        image,
        price,
        quantity,
        sku
      });
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      // Handle the case where the SKU uniqueness constraint is violated
      if (error.code === 11000) {
        return res.status(400).send('SKU must be unique.');
      }
      res.status(500).send('Server error');
    }
  };
  

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  // Update logic here
};

exports.deleteProduct = async (req, res) => {
  // Delete logic here
};
