import nodemailer from "nodemailer";

export default async function sendEmail({
  to,
  subject,
  html,
}: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as any);
    const info = await transporter.sendMail({ 
      from: process.env.SMTP_USER, 
      to, 
      subject, 
      html 
    });
    console.log("Email sent to:", to, "Message ID:", info.messageId);
  } catch (err: any) {
    console.error("EMAIL ERROR:", err.message);
  }
}