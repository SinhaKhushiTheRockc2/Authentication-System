// import statements
import passport from "passport";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../features/model/user.schema.js";
import tokenGenerator from "../utils/token_generator.js";
import { Strategy } from "passport-google-oauth2";
import bcrypt from 'bcrypt';
import sendWelcomeMail from "../utils/success_registration_mail.js";

const GoogleStrategy =Strategy;

// dotenv configuration
dotenv.config();

// Router creation
const googleRoutes=express.Router();

let user;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (requeset, accessToken, refreshToken, profile, done) => {
      console.log("user profile:", profile);
      try {
        user = await userModel.findOne({ email: profile.email });

        if (!user) {
          //If user not found generate a random password and user and store in the database
          const randomPassword = Math.random().toString(36).slice(-8);
          const passwordHashed =await bcrypt.hash(randomPassword,12);
          user = new userModel({
            username: profile.displayName,
            email: profile.email,
            password: passwordHashed,
          });
          await user.save();
        }
        console.log(user);
        // Generate jwt token
        const token = jwt.sign(
          {
            userID: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

googleRoutes.get("/", passport.authenticate("google", {scope:["profile", "email"]}));

// Route for handling Google authentication callback
googleRoutes.get("/callback", passport.authenticate("google", {
  failureRedirect: "/api/users/sign-in" 
}), (req, res) => {
  // Access the user and token from the passport session
  const { user, token } = req.session.passport.user;

  // Set JWT token as HTTP-only cookie
  res.cookie("jwtToken", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

  sendWelcomeMail(user.email);
  // Redirect to protected route
  res.redirect("/api/users/protected-page");
});

export default googleRoutes;