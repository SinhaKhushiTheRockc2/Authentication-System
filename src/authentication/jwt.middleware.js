// Import statements for necessary modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

//jwt auth middleware
const auth = async (req,res,next)=>{
    console.log("Unauthorized!, please provide authorization token to access sceret routes before");
    const {jwtToken} = req.cookies
    console.log(jwtToken);
    if(!jwtToken){
       // res.status(404).send("Unauthorized!, please provide authorization token to access sceret routes!")

       console.log("Unauthorized!, please provide authorization token to access sceret routes!");
       return res.redirect("/signin")
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data)=>{
        if(err){
            return res.status(404).send("Unauthorized token!")

        }else{
            req.userId = data.userId;
            next();
        }

    })
}

// export statement
export default auth;