const express = require("express");
const connectDB = require('./db/db.js')
const dotenv = require('dotenv'); 
const bodyParser = require('body-parser');
const usersDetails = require("./routes/userRoute.js");
// const userPosts = require("./routes/postRoute.js");
// const userProfile = require("./routes/profilesRoute.js");
const userAuth = require("./routes/authRoute.js");
const payStack = require("./routes/paystackRoute.js");
const cors = require("cors");

const app = express();
dotenv.config();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token'); // Include x-auth-token
    
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
    
  next(); 
});

//connect database
connectDB();
//init middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
//define routes
app.use("/api/v1/user", usersDetails);
app.use("/api/v1/payment", payStack);
// app.use("/api/v1/posts", userPosts);
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
   