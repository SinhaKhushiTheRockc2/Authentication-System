// import statement for mongoose
import mongoose from "mongoose";
import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

// Setting the url
const url=process.env.DB_URL;

// Function that handles database connection
const connectToDB=async()=>{
    try {
        // Connection establishment
        mongoose.connect(`${url}/authenticationdb`);
        console.log("MongoDb is connected using mongoose");
    } catch (error) {
        // Printing the error on console
        console.log(error);
    }
}

// Export statement
export default connectToDB;