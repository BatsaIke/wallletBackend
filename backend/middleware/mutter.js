const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const dotenv = require("dotenv");
dotenv.config()  

cloudinary.config({ 
  cloud_name: process.env.cloud_name ,
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'allProducts', // optional, uploads to the root folder if not specified
    // format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-file', // optional, uses file's name in Cloudinary by default
  },
});

 const parser = multer({ storage: storage });

 module.exports = parser;
