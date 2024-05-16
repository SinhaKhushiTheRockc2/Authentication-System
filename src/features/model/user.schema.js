// import mongoose
import mongoose from "mongoose";

// Schema Creation
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email: {type: String, unique: true, required: true,
        // Email should be of type example@xyz.com
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password:{type:String,required:true,
        // validate: {
        // validator: function(password) {
        //     // Password should be at least 8 characters long
        //     // and contain at least one uppercase letter and one special character
        //     return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        // },
        // message: "Password must be at least 8 characters long and contain at least one uppercase letter and one special character"
    // }
}
});

const userModel=mongoose.model('User',userSchema);

export default userModel;