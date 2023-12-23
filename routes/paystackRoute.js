const express = require("express");
const router = express.Router();
const auth =require('../moddleware/auth')



const { payToken, verifyPament } = require("../controller/userController.js");
//make payment
router
  .route("/pay")
  .post(auth,payToken)

//verify payment
  router
  .route("/verify").get(auth, verifyPament)

module.exports = router;
