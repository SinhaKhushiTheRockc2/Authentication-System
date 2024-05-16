// Middleware that handles all validation related things
const validate=async(data)=>{
    // Checking if the password and confirm_password field values match
    if(data.password !== data.confirm_password){
        return "The values of the password field and confirm password field do not match!!!";
    }
    return null;
}

// Export statement
export default validate;