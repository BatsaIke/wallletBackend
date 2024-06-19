const Product = require("../model/ProductModel");

// Import the necessary utilities
const cloudinary = require("../utils/claudinary");

exports.createProduct = async (req, res) => {
  const {
    name,
    category,
    price,
    quantity,
    sku,
    description,
    rating,
    image,
    imageAmbiances,
  } = req.body;

  try {
    // Assuming `image` is a Base64-encoded string of your file
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    // Upload ambiances if provided
    let ambianceUploads = [];
    if (imageAmbiances && imageAmbiances.length > 0) {
      ambianceUploads = await Promise.all(
        imageAmbiances.map(async (ambiance) => {
          const response = await cloudinary.uploader.upload(ambiance, {
            folder: "products/ambiances",
          });
          return {
            public_id: response.public_id,
            url: response.secure_url,
          };
        })
      );
    }

    const newProduct = await Product.create({
      name,
      category,
      price,
      quantity,
      sku,
      description,
      rating,
      image: {
        public_id: uploadResponse.public_id,
        url: uploadResponse.secure_url,
      },
      imageAmbiances: ambianceUploads,
    });

    // Log the new product to check if all fields are set correctly
    console.log(newProduct);

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    let query = Product.find();

    if (req.query.name) {
      query = query.where("name", { $regex: req.query.name, $options: "i" });
    }

    if (req.query.category) {
      query = query.where("category", req.query.category);
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query = query
        .where("price")
        .gte(req.query.minPrice || 0)
        .lte(req.query.maxPrice || Number.MAX_VALUE);
    }

    if (req.query.sortBy) {
      const sortParam =
        req.query.sortOrder === "desc"
          ? `-${req.query.sortBy}`
          : req.query.sortBy;
      query = query.sort(sortParam);
    } else {
      query = query.sort("-createdAt");
    }

    const products = await query.skip(skip).limit(limit).exec();
    const totalItems = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    // Log the products to check the fields
    console.log(products);

    res.json({
      products,
      page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Log the product to check the fields
    console.log(product);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error"); 
  }
};

exports.updateProduct = async (req, res) => {
  const { name, category, price, quantity, sku, image } = req.body;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
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
        folder: "products",
      });
      updateData.image = {
        public_id: uploadResponse.public_id,
        url: uploadResponse.secure_url,
      };
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(`Attempting to delete product with ID: ${productId}`);

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // If the product has an image, delete it from Cloudinary
    if (product.image && product.image.public_id) {
      console.log(
        `Deleting image from Cloudinary with ID: ${product.image.public_id}`
      );
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    // Log before attempting to delete the product
    console.log(`Deleting product with ID: ${productId}`);
    const deleteResult = await Product.deleteOne({ _id: productId });

    // Log the result of the delete operation
    console.log(`Delete result: ${JSON.stringify(deleteResult)}`);

    if (deleteResult.deletedCount === 0) {
      return res.status(500).json({ msg: "Failed to delete product" });
    }

    res.json({ msg: "Product removed" });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server error");
  }
};
