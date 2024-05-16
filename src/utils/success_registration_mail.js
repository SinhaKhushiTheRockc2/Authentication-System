// Import statement for nodemailer
import nodemailer, { createTransport } from "nodemailer";
import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

const sendWelcomeMail = async (email) => {
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
    subject: "Successful SignUp",
    text: "Congratulations!! You have registered yourself as a user successfully!!",
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
export default sendWelcomeMail;