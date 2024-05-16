// import statements
import express from "express";
import UserController from "../controller/user.controller.js";
import auth from "../../authentication/jwt.middleware.js";

// Router creation
const userRouter=express.Router();

// user controller instance creation
const userController=new UserController();

// Get request
userRouter.get('/',(req,res,next)=>{
    userController.defaultPage(req,res,next);
});

userRouter.get('/signin',(req,res,next)=>{
    userController.getSigninPage(req,res,next);
});

userRouter.get('/reset-password',(req,res,next)=>{
    userController.getResetPasswordPage(req,res,next);
});

userRouter.get('/reset-password-token',(req,res,next)=>{
    userController.getResetPasswordToken(req,res,next);
});

userRouter.get('/update-password',(req,res,next)=>{
    userController.getUpdatePasswordPage(req,res,next);
});

userRouter.get('/forgot-password',(req,res,next)=>{
    userController.getForgotPassword(req,res,next);
});

userRouter.get('/reset-forgotten-password',(req,res,next)=>{
    userController.getResetForgottenPassword(req,res,next);
});

userRouter.get('/protected-page',auth,(req,res,next)=>{
    userController.showProctectedPage(req,res,next);
});

userRouter.get('/logout',(req,res,next)=>{
    userController.logout(req,res,next);
});

// Auth 
userRouter.get('/google',(req,res,next)=>{
    console.log("Login from google");
    res.status(200).redirect('/auth/google');
});

// Post requests
userRouter.post('/',(req,res,next)=>{
    userController.signup(req,res,next);
});

userRouter.post('/signin',(req,res,next)=>{
    userController.signin(req,res,next);
});

userRouter.post('/reset-password',(req,res,next)=>{
    userController.resetPassword(req,res,next);
});

userRouter.post('/reset-password-token',(req,res,next)=>{
    userController.resetPasswordTokenHandler(req,res,next);
});

userRouter.post('/update-password',(req,res,next)=>{
    userController.updatePassword(req,res,next);
});

userRouter.post('/forgot-password',(req,res,next)=>{
    userController.forgotPassword(req,res,next);
});

userRouter.post('/reset-forgotten-password',(req,res,next)=>{
    userController.updatePassword(req,res,next);
});
// Export statement
export default userRouter;