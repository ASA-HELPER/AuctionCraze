import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, message }) => {
  await resend.emails.send({
    from: process.env.RESEND_MAIL,
    to: email,
    subject,
    text: message,
  });
};
