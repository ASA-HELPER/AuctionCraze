import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, message }) => {
  const response = await resend.emails.send({
    from: process.env.RESEND_MAIL,
    to: [process.env.RESEND_RECEIVE_MAIL],
    subject,
    html: `<pre>${message}</pre>`,
  });
};
