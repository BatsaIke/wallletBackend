// routes/affiliateRoutes.js

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const auth = require("../middleware/auth");
const { getAffiliates, createAffiliate, getAffiliateById } = require("../controller/affiliateController");
const checkRole = require("../utils/checkRole");

// Create a new affiliate
router.post(
  "/create",
  [
    check("name", "Name is required").notEmpty(),
    check("location", "Location is required").notEmpty(),
    check("products", "Products must be an array").isArray(),
    check("phoneNumber", "Phone number is required").notEmpty(),
    check("email", "Email is required").isEmail(),
  ],
  createAffiliate
);

// Get all affiliates
router.get("/get", auth,checkRole(['admin', 'moderator']),getAffiliates);

// Get affiliate by ID
router.get("/get/:id", auth,checkRole(['admin', 'moderator']),getAffiliateById);

module.exports = router;
