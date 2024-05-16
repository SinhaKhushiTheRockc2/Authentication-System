// Third party module import statements
import express from "express";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from 'cors';
import passport from "passport";

// Internal modules import statements
import userRouter from "./src/features/routes/user.routes.js";
import connectToDB from "./src/config/mongooseConfig.js";
import googleRoutes from "./src/authentication/googleOAuth.js";
import mongoose from "mongoose";
import ApplicationError from "./src/error_handler/application-error.js";

// Server creation
const server=express();

//dotenv configuration 
dotenv.config();

// express session setup
server.use(session({
    resave:false,
    saveUninitialized:true,
    secret:process.env.SESSION_SECRET
}));

// Giving access to static files
server.use(express.static(path.join(path.resolve(),'public')));

// Parse form data
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// setup view engine settings
server.set('view engine', 'ejs');
server.set("views", path.join(path.resolve(),"src","features", "views"));

// Passport setup
server.use(passport.initialize());
server.use(passport.session());

// Route configuration
server.use('/api/users',userRouter);
server.use('/auth/google',googleRoutes);

// Error handler 
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message);
    }
    if(err instanceof ApplicationError){
        return res.status(400).send(err.message);
    }
    // server errors.
    res
      .status(500)
      .send(
        'Something went wrong, please try later'
      );
});

// Default path
server.use('/',(req,res,next)=>{
  res.redirect('/api/users/');
})
// Port specification
server.listen(process.env.PORT,()=>{
    console.log("Server is listening on port 3000");
    // Db connection method
    connectToDB();
});