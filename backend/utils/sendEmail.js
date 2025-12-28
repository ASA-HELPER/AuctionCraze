import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 100000,
  });
  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };
  await transporter.sendMail(options);
};
