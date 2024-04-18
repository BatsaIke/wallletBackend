const path = require("path");


// Function to upload file
const uploadFile = async (file) => {
    if (!file) {
      return ""; // Return an empty string if no file is provided
    }
  
    const filename = file.filename;
    const fileUrl = path.join(filename);
  
    // Perform the necessary file upload logic here
  
    return fileUrl;
  };

  module.exports = uploadFile;
