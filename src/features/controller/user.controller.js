// Importing necessary modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import validate from "../../utils/password_validation.js";
import UserRepository from "../model/user.repository.js";
import sendWelcomeMail from "../../utils/success_registration_mail.js";
import jwtAuth from "../../utils/jwt.authentication.js";
import tokenGenerator from "../../utils/token_generator.js";
import generateResetToken from "../../utils/generate-reset-password-link.js";
import userModel from "../model/user.schema.js";
import sendVerificationToken from "../../utils/reset_password_token.js";

// dotenv configuration
dotenv.config();

let userId;
// User controller class
export default class UserController {
  // Defining Constructor
  constructor() {
    this.userRepo = new UserRepository();
  }

  // Get default signup page
  async defaultPage(req, res, next) {
    // Default sign-up page
    res.render("sign-up", { errorMessage: null, successMessage: null });
  }

  // Get signin page
  async getSigninPage(req, res, next) {
    // Sign-in page
    res.render("sign-in", { errorMessage: null, successMessage: null });
  }

  // Get reset-password page
  async getResetPasswordPage(req, res, next) {
    // Reset password page
    res.render("reset-password", { errorMessage: null });
  }

  // Get reset-password-token page
  async getResetPasswordToken(req, res, next) {
    // Reset password token page
    res.render("reset-password-token", { errorMessage: null });
  }

  // Get change-password page
  async getUpdatePasswordPage(req, res, next) {
    // Change password page
    res.render("update-password", { errorMessage: null });
  }

  // Get forgot-password page
  async getForgotPassword(req, res, next) {
    // Forgot password page
    res.render("forgot-password", { errorMessage: null, successMessage: null });
  }

  // Get reset-forgotten-password page
  async getResetForgottenPassword(req, res, next) {
    res.render("reset-forgotten-password", { errorMessage: null });
  }
  // Controller method that handles user sigup or registration request
  async signup(req, res, next) {
    console.log(req.body);
    try {
      // Validating password field
      const message = await validate(req.body);
      if (message) {
        return res.status(200).render("sign-up", { errorMessage: message });
      }
      // New user creation
      const newUser = await this.userRepo.registerUser(req.body);
      if (newUser) {
        // Return resource created status
        sendWelcomeMail(req.body.email);
        return res.status(200).redirect("/api/users/signin");
      }
    } catch (error) {
      // Handling duplicate key error
      if (error.name === "MongoServerError" && error.code === 11000) {
        res.status(400).render("sign-up", {
          errorMessage: "Email alredy registered, Sign in to continue",
        });
      } else {
        // Handling Error
        res.status(400).render("sign-up", {
          errorMessage:
            "Something went wrong while trying to register the user, Please refresh the page and fill your details again or visit the page after some time",
        });
      }
    }
  }

  // Controller method that handles User login requests
  async signin(req, res, next) {
    try {
      // Checking if the user exists or not
      console.log(req.body.email);
      console.log(req.body.password);
      const user = await this.userRepo.findByEmail(req.body.email);
      console.log(user);
      console.log(user[0].password);
      if (!user) {
        // If the user doesn't exist returning the error message
        return res
          .status(400)
          .render("sign-in", {
            errorMessage: "Incorrect credentials",
            successMessage: null,
          });
      } else {
        // If the user exist
        // comparing the password enterd by user with the password present in the database
        const result = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        console.log(result);
        if (result) {
          const response = await tokenGenerator(user);
          if (response) {
            return res.status(200).render("protected-page");
            return res.status(200).cookie("jwtToken", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).render("protected-page", {loginResult:loginResult.user, jwtToken:token});
          } else {
            return res
              .status(400)
              .render("sign-in", {
                errorMessage: "Not a valid token",
                successMessage: null,
              });
          }
        } else {
          return res.status(400).render("sign-in", {
            errorMessage: "The passwords in the password field do not match",
            successMessage: null,
          });
        }
      }
    } catch (error) {
      // Handling error
      console.log(error);
      return res.status(400).render("sign-in", {
        errorMessage: "Something went wrong while trying to login the user",
        successMessage: null,
      });
    }
  }

  // Controller method that handles reset-password functionality
  async resetPassword(req, res, next) {
    try {
      // Checking if the user exists
      const user = await this.userRepo.findByEmail(req.body.email);
      console.log(user);
      // If user exists
      if (user) {
        // Send token
        const result = await tokenGenerator(user);
        if (result) {
          sendVerificationToken(user[0].email,result);
          return res.status(200).redirect("/api/users/reset-password-token");
        } else {
          return res.status(400).render("reset-password", {
            errorMessage: "Failed to find the email id",
          });
        }
      }
      return res
        .status(400)
        .render("reset-password", { errorMessage: "Something went wrong" });
    } catch (error) {
      return res.status(400).render("reset-password", {
        errorMessage: "Something went wrong while trying to send the token",
      });
    }
  }

  // Controller method that will handle the reset-password token
  async resetPasswordTokenHandler(req, res, next) {
    try {
      // Get the token
      const token = req.body.token;
      // Verify if the token matches or not
      const result = jwtAuth(req, res, token);
      userId = req.userID;
      console.log("useId:", userId);
      // If failure
      if (!result) {
        res.status(400).render("reset-password-token", {
          errorMessage:
            "Token validation failed, check the token you have entered once again",
        });
      } else {
        // If success
        return res
          .status(200)
          .redirect(`/api/users/update-password?token=${token}`);
      }
    } catch (error) {
      // Handling errors
      return res.status(400).render("reset-password-token", {
        errorMessage: "Something went wrong while trying to validate the token",
      });
    }
  }

  // Controller method to update the password
  async updatePassword(req, res, next) {
    // const {userID}=req.userID;
    console.log(userId);
    try {
      // Updating the password
      const result = await this.userRepo.updatePasswordRepo(
        userId,
        req.body.password
      );
      if (result) {
        return res.status(200).redirect("/api/users/signin");
      }
      return res.status(400).render("update-password", {
        errorMessage: "Failed to update the password",
      });
    } catch (error) {
      // Handling error
      console.log(error);
      return res.status(400).render("update-password", {
        errorMessage:
          "Something went wrong while trying to update the password",
      });
    }
  }

  // Controller method to handle forgot password problem
  async forgotPassword(req, res, next) {
    try {
      // Checking if user exist in the database
      const user = await this.userRepo.findByEmail(req.body.email);
      // if user exists
      if (user) {
        // Generate reset password link
        const result = await generateResetToken(user);
        console.log(result);
        // If reset token generated successfully
        if (result) {
          const authenticate = await jwtAuth(req, res, result);
          if (authenticate) {
            userId = req.userID;
          }
          console.log(userId);
          return res.status(200).render("forgot-password", {
            errorMessage: null,
            successMessage:
              "An email with reset password link has been sent to you",
          });
        } else {
          return res.status(400).render("forgot-password", {
            errorMessage: "Something went wrong",
            successMessage: null,
          });
        }
      }
      return res.status(400).render("forgot-password", {
        errorMessage: "Not a valid user",
        successMessage: null,
      });
    } catch (error) {
      // Handling error
      return res.status(400).render("forgot-password", {
        errorMessage: "Something went wrong",
        successMessage: null,
      });
    }
  }

  // Controller method to handle user logout request
  async logout(req, res, next) {
    try {
      req.session.destroy();
      res.clearCookie("jwtToken").render("sign-in", {
        errorMessage: null,
        successMessage: "Logout successful!!",
      });
    } catch (error) {
      next(error);
    }
  }

  // Controller method to show protected page
  async showProctectedPage(req, res, next) {
   res.render('protected-page');
  }
}
