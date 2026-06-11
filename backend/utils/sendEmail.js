import { Resend } from "resend";

const sendEmail = async (options) => {
  try {
    console.log("📧 Attempting to send email to:", options.email);

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: "NEXUS <onboarding@resend.dev>",
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    // IMPORTANT: Check for Resend errors
    if (response.error) {
      console.error("❌ Resend Error:", response.error);
      throw new Error(
        response.error.message || "Failed to send email via Resend"
      );
    }

    if (!response.data || !response.data.id) {
      throw new Error("Failed to send email: No message ID returned from Resend");
    }

    console.log("✅ Email sent successfully");
    console.log("📬 Message ID:", response.data.id);

    return {
      success: true,
      messageId: response.data.id,
    };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;