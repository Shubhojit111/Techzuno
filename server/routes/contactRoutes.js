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

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Inquiry</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
            color: #333333;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
          .header {
            background-color: #03B8B8;
            color: #ffffff;
            padding: 30px 40px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .content {
            padding: 40px;
          }
          .info-block {
            margin-bottom: 25px;
            padding-bottom: 25px;
            border-bottom: 1px solid #eeeeee;
          }
          .info-block:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .label {
            font-size: 12px;
            text-transform: uppercase;
            color: #888888;
            letter-spacing: 1px;
            margin-bottom: 5px;
            display: block;
          }
          .value {
            font-size: 16px;
            color: #222222;
            margin: 0;
          }
          .message-box {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            font-size: 15px;
            line-height: 1.6;
            color: #444444;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #fcfcfc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
            border-top: 1px solid #eeeeee;
          }
          .badge {
            display: inline-block;
            background-color: #e6f7f7;
            color: #03B8B8;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Techzuno Inquiry</h1>
            <span class="badge">${escapeHtml(source)}</span>
          </div>
          
          <div class="content">
            <div class="info-block">
              <span class="label">Contact Details</span>
              <p class="value"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p class="value"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #03B8B8; text-decoration: none;">${escapeHtml(email)}</a></p>
              ${phone ? `<p class="value"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
              ${company ? `<p class="value"><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
            </div>

            <div class="info-block">
              <span class="label">Inquiry Details</span>
              <p class="value"><strong>Type:</strong> ${escapeHtml(inquiry)}</p>
              ${service ? `<p class="value"><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
            </div>

            <div class="info-block">
              <span class="label">Message</span>
              <div class="message-box">${escapeHtml(message || "No message provided.")}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was automatically generated from the Techzuno website.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `New Techzuno enquiry${service ? ` - ${service}` : ""}`,
      text: lines.join("\n"),
      html: emailHtml,
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
