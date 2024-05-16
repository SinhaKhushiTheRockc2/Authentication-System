// Import necessary module
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

const jwtAuth = async(req,res,token) => {
  // 1. Read the token.
  console.log(token);
  // 2. if no token, return the error.
  if (!token) {
    return false;
  }
  // 3. check if token is valid.
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.userID=payload.userID;
    console.log(payload.userID);
    console.log(req.userID);
    return true;
  } catch (err) {
    // 4. return error.
    console.log(err);
    return false;
  }
};

export default jwtAuth;
