// Importing jwt
import jwt from "jsonwebtoken";
import sendResetPasswordLink from "./reset-link-mail.js";

// Generate a reset token with an expiry timestamp
const generateResetToken = async(user) => {
    // Generating a random token
    try {
        // Generate token
        const token = jwt.sign(
            {
              userID: user[0]._id,
              email: user[0].email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "10m",
            }
          );
          const expiryTimestamp = Date.now() + 15 * 60 * 1000; // 15 minutes in milliseconds
          const resetLink = `localhost:3000/api/users/reset-forgotten-password?token=${token}&expiry=${expiryTimestamp}`;
          sendResetPasswordLink(user[0].email,resetLink);
          return token;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default generateResetToken;