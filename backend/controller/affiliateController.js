// controllers/affiliateController.js

const { validationResult } = require("express-validator");
const Affiliate = require("../model/AffiliateModel"); 

// Create a new affiliate
const createAffiliate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, location, products, phoneNumber, email } = req.body;

  // Ensure products is an array
  if (!Array.isArray(products)) {
    // If products are separated with commas, split them into an array
    if (products.includes(',')) {
      products = products.split(',').map(product => product.trim());
    } else {
      // If products are single, convert it into an array
      products = [products];
    }
  }

  try {
    const affiliate = new Affiliate({
      name,
      location,
      products, // Ensure products is an array of strings
      phoneNumber,
      email,
    });

    await affiliate.save();

    res.status(201).json({ message: "Affiliate created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};


// Get all affiliates with sorting options
const getAffiliates = async (req, res) => {
    const { sortBy, sortOrder } = req.query;
  
    // Define default sort options
    let sortOptions = { name: 1 }; // Default sorting by name in ascending order
  
    // Adjust sort options based on query parameters
    if (sortBy) {
      if (sortBy === "search") {
        sortOptions = { name: 1 }; // Sort by name for search
      } else if (sortBy === "initials") {
        sortOptions = { name: 1 }; // Sort by name for initials
      } else if (sortBy === "date") {
        sortOptions = { createdAt: -1 }; // Sort by date in descending order
      }
    }
  
    try {
      let affiliates;
      if (sortOrder && sortOrder.toLowerCase() === "desc") {
        affiliates = await Affiliate.find().sort(sortOptions).reverse();
      } else {
        affiliates = await Affiliate.find().sort(sortOptions);
      }
      res.json(affiliates);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  };
  

// Get affiliate by ID
const getAffiliateById = async (req, res) => {
  try {
    const affiliate = await Affiliate.findById(req.params.id);
    if (!affiliate) {
      return res.status(404).json({ message: "Affiliate not found" });
    }
    res.json(affiliate);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createAffiliate,
  getAffiliates,
  getAffiliateById,
};
