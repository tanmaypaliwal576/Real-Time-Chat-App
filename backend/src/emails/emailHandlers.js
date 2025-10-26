import { resendClient } from "../lib/resend.js";
import createWelcomeEmailTemplate from "../emails/emailTemplate.js";
import { sender } from "../lib/resend.js";

// ✅ CHANGE: The function now accepts 'emails' (plural) which MUST be an array of strings.
export const SendWelcomeEmail = async (emails, name, clientURL) => {
  // 🛑 VALIDATION CHECK: Ensure 'emails' is an array and has at least one recipient
  if (!Array.isArray(emails) || emails.length === 0) {
    console.error(
      "Email sending failed: Recipients list is empty or not an array."
    );
    return; // Stop execution
  }

  try {
    const data = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      // ✅ FIX: The 'to' field directly uses the 'emails' array.
      to: emails,
      subject: "Welcome to Chat-App!",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    console.log(`Welcome Mail Sent to ${emails.length} recipients.`, data);
  } catch (error) {
    console.error("Error sending welcome email(s):", error);
    // You might want to throw the error or handle logging here
  }
};
