// Importing necessary modules
import jwt from "jsonwebtoken";
import sendVerificationToken from "./reset_password_token.js";


const tokenGenerator = async (user) => {
  try {
    // Generate token
    const token = jwt.sign(
      {
        userID: user[0]._id,
        email: user[0].email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default tokenGenerator;
