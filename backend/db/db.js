const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
    });
    console.log('Connected to database successfully');
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

process.on('unhandledRejection', (error) => {
  console.error(`Unhandled promise rejection: ${error.message}`); 
  // Additional cleanup or logging before exit can go here
  process.exit(1);
}); 
  
module.exports = connectDB; 