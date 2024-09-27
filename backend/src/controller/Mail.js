import nodemailer from 'nodemailer'
import ('dotenv/config')
import { z } from 'zod';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.SEND,
  },
});

const mailSchema = z.object({
  fromName: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
  fromEmail: z.string().email("Invalid email format"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(50, "Subject must be at most 50 characters"),
  message: z.string().min(3, "Message must be at least 3 characters").max(500, "Message must be at most 500 characters"),
})

export const sendEmail = async (req, res) => {
  try {
    const { fromName, fromEmail, subject, message } = mailSchema.parse(req.body);
    const from = `"${fromName}" <${fromEmail}>`;
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              border-bottom: 2px solid #eee;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              color: #333;
            }
            .content {
              font-size: 16px;
              line-height: 1.6;
            }
            .footer {
              border-top: 2px solid #eee;
              padding-top: 10px;
              margin-top: 20px;
              font-size: 14px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Message from ${fromName}</h1>
            </div>
            <div class="content">
              <p><strong>Subject:</strong> ${subject}</p>
              <p>${message}</p>
            </div>
            <div class="footer">
              <p>Sent from ${fromEmail}</p>
            </div>
          </div>
        </body>
      </html>
    `;
    await transporter.sendMail({
      from,
      to: process.env.TO,
      subject,
      text: message,
      html: htmlContent,
    });

    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email." });
  }
};


