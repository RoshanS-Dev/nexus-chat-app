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

    console.log("✅ Email sent successfully");
    console.log("📬 Response:", response);

    return {
      success: true,
      messageId: response.data?.id,
    };
  } catch (error) {
    console.error("❌ Email sending failed:", error);

    throw new Error(
      `Email sending failed: ${error.message || "Unknown error"}`
    );
  }
};

export default sendEmail;