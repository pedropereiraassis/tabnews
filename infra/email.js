import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: process.env.EMAIL_SMTP_PORT,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
  secure: process.env.NODE_ENV === "production",
});

async function send(emailOpts) {
  await transporter.sendMail(emailOpts);
}

const email = {
  send,
};

export default email;
