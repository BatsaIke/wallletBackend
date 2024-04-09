const Product = require('../model/ProductModel');

// Import the necessary utilities
const cloudinary = require("../utils/claudinary"); 


exports.createProduct = async (req, res) => {
  const { name, category, price, image, sku,quantity } = req.body;
   
  try {
      // Assuming `image` is a Base64-encoded string of your file
      const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "products"
      }); 
      const newProduct = await Product.create({
          name,
          category,
          price,
          quantity,
          sku,
          image: {
            public_id: uploadResponse.public_id,
            url: uploadResponse.secure_url
        },
      });

      res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
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
