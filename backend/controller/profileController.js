

// Import nodemailer to send reset password emails
const nodemailer = require("nodemailer");
const User = require("../model/UserModel")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");



// Generate a unique token for password reset
const generateResetToken = async (user) => {
    try {
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
      await user.save();
      return resetToken;
    } catch (error) {
      console.error("Error generating reset token:", error);
      throw error; // Propagate the error to the calling function
    }
  };
  


// Controller to request password reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Use generateResetToken function to generate and save the token
        const resetToken = await generateResetToken(user);

        // Send an email to the user with the password reset link
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            to: user.email,
            subject: "Password Reset",
            text: `Click on the following link to reset your password: ${resetLink}`,
        };

        // Use nodemailer to send the email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.SMPT_PASSWORD,
            },
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error sending password reset email");
            } else {
                console.log("Email sent: " + info.response);
                res.status(200).json({ message: "Password reset email sent" });
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
      const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      const user = await User.findOne({
        resetPasswordToken: hashedResetToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        console.log("Invalid or expired token");
        return res.status(400).json({ error: "Invalid or expired token" });
      }
  
      // Update the user's password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      // Clear the reset token and expiration
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
     return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }; 

 




module.exports = {
  requestPasswordReset,
  resetPassword,
};
