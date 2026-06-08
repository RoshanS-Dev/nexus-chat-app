import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    console.log("📧 Attempting to send email to:", options.email);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error(
        "EMAIL_USER or EMAIL_PASS is missing in environment variables"
      );
    }

    console.log("📧 Using email account:", process.env.EMAIL_USER);
    console.log(
      "🔑 EMAIL_PASS length:",
      process.env.EMAIL_PASS?.length || 0
    );

    // Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (16 chars, no spaces)
      },
    });

    console.log("🔍 Verifying email transporter...");
    await transporter.verify();
    console.log("✅ Email transporter verified successfully");

    const mailOptions = {
      from: `"NEXUS" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    console.log("📤 Sending email...");

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    console.log("📬 Message ID:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    console.error("❌ Full error:", error);

    if (error.code === "EAUTH") {
      console.error("❌ Gmail Authentication Failed");
      console.error(
        "Make sure EMAIL_PASS is a Gmail App Password, not your Gmail password."
      );
    }

    if (error.code === "ETIMEDOUT") {
      console.error(
        "❌ SMTP Connection Timed Out. Render cannot connect to Gmail SMTP."
      );
    }

    throw new Error(`Email sending failed: ${error.message}`);
  }
};

export default sendEmail;