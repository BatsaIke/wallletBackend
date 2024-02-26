const cors = require('cors');

// Custom CORS Middleware
const customCorsMiddleware = (req, res, next) => {
  const allowedDomainPattern = /^https:\/\/walllet-backend/;
  const origin = req.headers.origin;

  // Check if the Origin header matches the allowed pattern
  if (origin && allowedDomainPattern.test(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // Reflect the requested origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
  }

  // Continue to the next middleware if the request is not an OPTIONS pre-flight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    next();
  }
};



module.exports = customCorsMiddleware