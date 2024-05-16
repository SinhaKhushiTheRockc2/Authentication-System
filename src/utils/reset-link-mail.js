// Import statement for nodemailer
import nodemailer, { createTransport } from "nodemailer";
import dotenv from "dotenv";


// dotenv configuration
dotenv.config();

const sendResetPasswordLink = async (email,resetLink) => {
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
    subject: "Reset Password Link",
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
        <p>Copy and paste this link on your browser:<strong><span style="color:blue">${resetLink}</span></strong></p>
        <p style="color:red">NOTE: This token will only be valid for 10 minutes</p>
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
export default sendResetPasswordLink;