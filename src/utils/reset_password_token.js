// Import statement for nodemailer
import nodemailer, { createTransport } from "nodemailer";
import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

const sendVerificationToken = async (email,token) => {
  // Transporter Creation
  const transporter = createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_MAIL_PASSWORD,
    },
  });

  // Mail options declaration
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: `${email}`,
    subject: "Verification-Token",
    html:`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/sign-in.css" />
        <title>Signout or Reset Password</title>
      </head>
      <body>
        <h1 style="text-align:center;color:green">Reset Password Token</h1>
        <p>This is a second-step for verification purpose that you will have to follow otherwise you won't be able to use any of the other functionalities</p>
        <p>Paste this token <strong><span style="color:blue">${token}</span></strong> in the token field to verify that its you who is trying to login!!!</p>
        <p style="color:red">NOTE: This token will only be valid for 5 minutes</p>
      </body>
    </html>
    `
  };

  try {
    // Sending the mail
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    // Consoling out errors if any
    console.log(error);
  }
};


// Export statement 
export default sendVerificationToken;