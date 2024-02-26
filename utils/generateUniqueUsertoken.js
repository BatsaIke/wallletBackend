// tokenGenerator.js
function generateUniqueToken() {
    // Generate a unique token with the format 'TKXXXXX' (e.g., 'TK12345')
    const prefix = 'TK';
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
    return prefix + randomString;
  }
  
  module.exports = generateUniqueToken;
  