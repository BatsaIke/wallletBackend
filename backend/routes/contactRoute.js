// routes/contactRoutes.js

const express = require("express");
const { check } = require("express-validator");
const {
  createContact,
  getContacts,
  getContactById,
} = require("../controller/contactsController");
const auth = require("../middleware/auth");
const checkRole = require("../utils/checkRole");
const router = express.Router();

// Create a new contact
router.post(
  "/create",
  [
    check("reference", "reference is required").not().isEmpty(),
    check("contactNumber", "Contact number is required").isNumeric(),
    check("feedback", "Feedback is required").not().isEmpty(),
  ],
  createContact
);

// Get all contacts
router.get("/get",auth,checkRole(['admin', 'moderator']), getContacts);

// Get contact by ID
router.get("/get/:id",auth,checkRole(['admin', 'moderator']), getContactById);

module.exports = router;
