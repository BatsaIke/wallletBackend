const express = require("express");
const connectDB = require('./db/db.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const usersDetails = require("./routes/userRoute.js");
const userProfile = require("./routes/profileRoute");
const userAuth = require("./routes/authRoute.js");
const payStack = require("./routes/paystackRoute.js");
const cors = require("cors");

const app = express();
dotenv.config();

// Connect to the database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Define routes
app.use("/api/v1/user", usersDetails);
app.use("/api/v1/payment", payStack);
app.use("/api/v1/password", userProfile);
app.use("/api/v1/auth/user", userAuth);

const PORT = process.env.PORT || 5100;
app.get("/api/v1", (req, res) => res.send("API is running"));
const server = app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => process.exit(1));
});
