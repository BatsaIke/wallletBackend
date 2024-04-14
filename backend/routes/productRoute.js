const express = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productsController");
const auth = require("../middleware/auth");
const router = express.Router();

// Add validation checks for creating and updating products
router.post(
  "/", auth,
  [
    check("name", "Product name is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("image", "Image URL is required").not().isEmpty(),
    check("price", "Price is required and must be a number").isNumeric(),
    check("quantity", "Quantity is required and must be a number").isNumeric(),
  ],
  createProduct
);

// Assuming no validation is needed for fetching products
router.get("/", getProducts);
router.get("/:id",auth, getProductById);

// Assuming validation for updating products might be similar to creating them, adjust as needed
router.put(
  "/:id",auth,
  updateProduct
);

router.delete("/product/:id",auth, deleteProduct);

module.exports = router;
