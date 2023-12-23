const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.mongoURI);
    console.log(`connected to database succesfully:...`);
  } catch (error) {
    console.error(error.message);
    process.exit(1)
  }
};

module.exports=connectDB
