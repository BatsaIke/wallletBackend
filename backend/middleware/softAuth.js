const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  // If a token is present, attempt to verify it
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded.user;
    } catch (error) {
      console.error(error);
      // If the token is invalid, log the error but don't deny access
      // Just proceed without setting `req.user`
    }
  }

  // Proceed to the next middleware function regardless of token presence or validity
  next();
};
