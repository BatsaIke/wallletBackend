const express = require("express");
const router = express.Router();
const auth = require("../moddleware/auth.js");
const { check } = require("express-validator");

const {
  payToken,
  payAsGuest,
  verifyPament,
  buyProduct,
} = require("../controller/paymentController.js");
//make payment
router.route("/pay").post(auth, payToken);

//pay as guest
router.route("/guest-payment").post(payAsGuest);

//verify payment
router.route("/verify").get(auth, verifyPament);

// New route for buying a product
router
  .route("/buy-product")
  .post(
    auth,
    [check("amount", "Amount is required and must be a number").isNumeric()],
    buyProduct
  );

module.exports = router;
