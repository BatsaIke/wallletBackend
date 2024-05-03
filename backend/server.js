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
const contactRoute = require("./routes/contactRoute.js");
const affiliateRoute = require("./routes/affiliateRoutes.js");
const path = require('path');
const buildPath=path.join(__dirname, "../products/build");


const cors = require("cors");
const {handlePaystackWebhook} = require("./middleware/payStackWebhook.js");

const app = express();
dotenv.config();

// Connect to the database
connectDB();

app.use(express.static(buildPath))

app.use('/*', function(req, res) {
  res.sendFile(
    path.join(__dirname, "../products/build/index.html"),
    function(err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// Init middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ extended: false }));
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());



//cathing errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  
// Define routes
app.use("/api/v1/user", usersDetails);
app.use("/api/v1/payment", payStack); 
app.use("/api/v1/password", userProfile);
app.use("/api/v1/auth/user", userAuth);
app.use("/api/v1/profile", userProfile);
app.post("/api/v1/webhook/paystack", handlePaystackWebhook);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/contact', contactRoute);
app.use('/api/v1/affiliate', affiliateRoute);
 


const PORT = process.env.PORT || 5100;


app.get("/api/v1", (req, res) => res.send("API is running"));
const server = app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => process.exit(1));
});
 

