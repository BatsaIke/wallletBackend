// controllers/contactController.js

const { validationResult } = require("express-validator");
const Contact = require("../model/ContactsModel");
const User = require("../model/UserModel"); 

// Create a new contact
const createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, contactNumber, email, feedback, reference } = req.body;

  try {
    let user;
    if (userId) {
      // If userId is provided, check if the user exists
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    // Create a new contact
    const contact = new Contact({
      user: user || undefined, // Assign user if provided, otherwise undefined
      contactNumber,
      email,
      feedback,
      reference,
    });

    await contact.save();

    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};



// Get all contacts with sorting options
const getContacts = async (req, res) => {
  const { sortBy, sortOrder } = req.query;

  // Define default sort options
  let sortOptions = { createdAt: -1 }; // Default sorting by createdAt in descending order

  // Adjust sort options based on query parameters
  if (sortBy) {
    if (sortBy === "search") {
      sortOptions = { createdAt: -1 }; // Sort by createdAt for search
    } else if (sortBy === "date") {
      sortOptions = { createdAt: -1 }; // Sort by createdAt for date
    }
  }

  try {
    let contacts;
    if (sortOrder && sortOrder.toLowerCase() === "asc") {
      contacts = await Contact.find().sort(sortOptions);
    } else {
      // Modify the sortOptions directly for descending order
      sortOptions.createdAt = 1; // Change sort order to ascending
      contacts = await Contact.find().sort(sortOptions);
    }
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};


// Get contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate("user");
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
};
