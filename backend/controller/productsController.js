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
    const page = parseInt(req.query.page, 10) || 1; // default to first page
    const limit = parseInt(req.query.limit, 10) || 32; // default to 32 items per page
    const skip = (page - 1) * limit;

    // Filters
    let query = Product.find();

    // Search by name
    if (req.query.name) {
      query = query.where('name', { $regex: req.query.name, $options: 'i' });
    }

    // Filter by category
    if (req.query.category) {
      query = query.where('category', req.query.category);
    }

    // Filtering by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query = query.where('price').gte(req.query.minPrice || 0).lte(req.query.maxPrice || Number.MAX_VALUE);
    }

    // Sorting
    if (req.query.sortBy) {
      const sortParam = req.query.sortOrder === 'desc' ? `-${req.query.sortBy}` : req.query.sortBy;
      query = query.sort(sortParam);
    } else {
      query = query.sort('-createdAt'); // Default sorting
    }

    // Execute query with pagination
    const products = await query.skip(skip).limit(limit).exec();
    const totalItems = await Product.countDocuments(query); // Count the total items
    const totalPages = Math.ceil(totalItems / limit); // Calculate total pages

    res.json({
      products,
      page,
      totalPages,
      totalItems
    });
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
  const { name, category, price, quantity, sku, image } = req.body;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    let updateData = {
      name: name || product.name,
      category: category || product.category,
      price: price || product.price,
      quantity: quantity || product.quantity,
      
    };

    // If a new image is provided, upload it and update the image fields
    if (image && image !== product.image.url) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "products"
      });
      updateData.image = {
        public_id: uploadResponse.public_id,
        url: uploadResponse.secure_url
      };
    }

    product = await Product.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // If the product has an image, delete it from Cloudinary
    if (product.image && product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.remove();

    res.json({ msg: 'Product removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
};
