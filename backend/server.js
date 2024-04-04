const express = require("express");
const connectDB = require('./db/db.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const usersDetails = require("./routes/userRoute.js");
const userProfile = require("./routes/profileRoute");
const userAuth = require("./routes/authRoute.js");
const payStack = require("./routes/paymentRoute.js");
const orderRoute = require("./routes/orderRoutes.js");
const productRoute = require("./routes/productRoute.js");
const cors = require("cors");
const handlePaystackWebhook = require("./moddleware/payStackWebhook.js");

const app = express();
dotenv.config();

// Connect to the database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors({
    origin: ['https://walllet-backend.vercel.app', 'https://www.highsandbites.com'],
    optionsSuccessStatus: 200, // For legacy browsers
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    preflightContinue: false, // Pass the CORS preflight response to the next handler
  }));app.use(bodyParser.json());

// Define routes
app.use("/api/v1/user", usersDetails);
app.use("/api/v1/payment", payStack); 
app.use("/api/v1/password", userProfile);
app.use("/api/v1/auth/user", userAuth);
app.use("/api/v1/profile", userProfile);
app.post("/api/v1/webhook/paystack", handlePaystackWebhook);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/products', productRoute);

const PORT = process.env.PORT || 5100;


app.get("/api/v1", (req, res) => res.send("API is running"));
const server = app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => process.exit(1));
});
