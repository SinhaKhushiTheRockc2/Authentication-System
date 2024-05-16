// import statement
import mongoose from "mongoose";

// Schema Creation
const googleUserSchema =new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String,
},{timestamps:true});

// Model creation
const googleUserModel = mongoose.model("GoogleUser", googleUserSchema);

// Export statement
export default googleUserModel;