const sendEmail = async (options) => {
  try {
    console.log("📧 Attempting to send email via Brevo API to:", options.email);

    console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);

    if (!process.env.BREVO_API_KEY) {
      throw new Error("Brevo API configuration (BREVO_API_KEY) is missing");
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "NEXUS",
          email: "roshanshaikh21122006@gmail.com",
        },
        to: [
          {
            email: options.email,
          },
        ],
        subject: options.subject,
        htmlContent: options.html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Brevo API returned status ${response.status}`);
    }

    const data = await response.json();

    console.log("✅ Email sent successfully");
    console.log("📬 Message ID:", data.messageId);

    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error("❌ Email sending failed:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

export default sendEmail;