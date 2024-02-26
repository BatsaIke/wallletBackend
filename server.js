const express = require("express");
const connectDB = require('./db/db.js')
const dotenv = require('dotenv'); 
const bodyParser = require('body-parser');
const usersDetails = require("./routes/userRoute.js");
// const userPosts = require("./routes/postRoute.js");
const userProfile = require("./routes/profileRoute");
const userAuth = require("./routes/authRoute.js");
const payStack = require("./routes/paystackRoute.js");
const cors = require("cors");
const customCorsMiddleware = require("./utils/corsCustomMiddleware.js");

const app = express();
dotenv.config();





// app.use(cors({
//   origin: '*', // or use a function to dynamically set the origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
//   credentials: true,
// }));

//connect database
connectDB();
//init middleware
app.use(express.json({ extended: false }));
app.use(cors(customCorsMiddleware));
app.use(bodyParser.json());
//define routes
app.use("/api/v1/user", usersDetails);
app.use("/api/v1/payment", payStack);
app.use("/api/v1/password", userProfile);
// app.use("/api/v1/profile", userProfile);
app.use("/api/v1/auth/user", userAuth);


const PORT = process.env.PORT ||5100;
app.get("/", (req, res) => res.send("Api is running"));
const server=app.listen(PORT, () => console.log(`Servver is listening on port: ${PORT}`));
 
 
//unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error appropriately, e.g., close the application or log the error.
    server.close(()=>{
        process.exit(1);  
    })
  });
   