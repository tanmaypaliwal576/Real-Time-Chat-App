import { resendClient } from "../lib/resend.js";
import createWelcomeEmailTemplate from "../emails/emailTemplate.js";
import { sender } from "../lib/resend.js";

export const SendWelcomeEmail = async (email, name, clientURL) => {
  const data = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: [email],
    subject: "Welcome to Chat-App!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });
  console.log("Welcome Mail Sent", data);
};
