const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getMailConfig = () => {
  const host = process.env.SMTP_HOST || process.env.MAIL_HOST;
  const port = Number(process.env.SMTP_PORT || process.env.MAIL_PORT || 587);
  const user =
    process.env.SMTP_USER || process.env.MAIL_USER || process.env.EMAIL_USER;
  const pass =
    process.env.SMTP_PASS || process.env.MAIL_PASS || process.env.EMAIL_PASS;
  const to = process.env.MAIL_TO || process.env.ADMIN_EMAIL;
  const from = process.env.MAIL_FROM || user || process.env.ADMIN_EMAIL;

  return { host, port, user, pass, to, from };
};

router.post("/", async (req, res) => {
  try {
    const {
      source = "Website",
      inquiry = "General Information Request",
      service = "",
      name,
      email,
      phone = "",
      company = "",
      message = "",
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    const { host, port, user, pass, to, from } = getMailConfig();

    if (!host || !user || !pass || !to) {
      return res.status(500).json({
        success: false,
        message:
          "Email is not configured. Please add SMTP_HOST, SMTP_USER, SMTP_PASS, and MAIL_TO or ADMIN_EMAIL.",
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure:
        process.env.SMTP_SECURE === "true" ||
        process.env.MAIL_SECURE === "true" ||
        port === 465,
      auth: { user, pass },
    });

    const lines = [
      `Source: ${source}`,
      `Inquiry: ${inquiry}`,
      service ? `Service: ${service}` : null,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      company ? `Company: ${company}` : null,
      "",
      "Message:",
      message || "No message provided.",
    ].filter((line) => line !== null);

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `New Techzuno enquiry${service ? ` - ${service}` : ""}`,
      text: lines.join("\n"),
      html: `
        <h2>New Techzuno enquiry</h2>
        <p><strong>Source:</strong> ${escapeHtml(source)}</p>
        <p><strong>Inquiry:</strong> ${escapeHtml(inquiry)}</p>
        ${service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || "No message provided.")}</p>
      `,
    });

    return res.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send message right now.",
    });
  }
});

module.exports = router;
