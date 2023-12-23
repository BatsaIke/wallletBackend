const User = require('../model/UserModel.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

//@rout GET api/auth
//@desc test route
//access public
const getAuthenticatedUser = async(req,res)=>{
    try {
        const user= await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
        
    }
}

//@rout POST api/auth/user
//@desc authenticate user and get token
//access public
const authenticateUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { text, password, } = req.body;
  
    try {
      // Log the values for debugging
 

      // Try to find the user by email or phone
      const user = await User.findOne({
        $or: [{ email:text }, { phone:text }],
      });
  
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
      }
  
      // Validate the password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
      }
  
      // Create and return a JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES },
        (err, token) => {
          if (err) throw err;
           // Exclude password from user data in the response
        const userWithoutPassword = { ...user.toObject(), password: undefined };

        res.json({ token, user: userWithoutPassword,message: "Login Successful"});
      }
    );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }; 



module.exports={
     getAuthenticatedUser,
    authenticateUser
   
}