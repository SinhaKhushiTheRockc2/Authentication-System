// Importing third party modules here
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Import statement for internal modules
import userModel from "./user.schema.js";
import ApplicationError from "../../error_handler/application-error.js";

// UserRepository class
export default class UserRepository{
    // Register a new user
    async registerUser(data){
        // Password encryption
        const hashedPassword=await bcrypt.hash(data.password,12);
        console.log(hashedPassword);
        // create new user
        const newUser=new userModel({username:data.username,email:data.email,password:hashedPassword});
        const savedUser=await newUser.save();
        // Return the saved user
        return savedUser;
    }

    // Find user by email
    async findByEmail(email){
        try {
            // Finding the user and returning the user
            const user=await userModel.find({email:email});
            return user;
        } catch (error) {
            // Handling error
            throw new ApplicationError("Something went wrong with the database",500);
        }
    }

    // Function that updates the old password
    async updatePasswordRepo(userID,newPassword){
        try {
            // Checking if the user exists 
            const user=await userModel.findById(userID);
            // If the user found , updating the password
            if(user){
                // Encrypting the password
                const hashedPassword=await bcrypt.hash(newPassword,12);
                const updatePassword=await userModel.findByIdAndUpdate(userID,{password:hashedPassword});
                if(updatePassword){
                    return true;
                }
                return false;
            }
        } catch (error) {
            // Handling error
            throw new ApplicationError('Something went wrong with the database',500);
        }
    }
}
