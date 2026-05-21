import nodemailer from "nodemailer";
import config from "../config.json";

export default async function sendEmail({
  to,
  subject,
  html,
  from = config.emailFrom,
}: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as any);
    const info = await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, html });
    console.log("Email sent to:", to, "Message ID:", info.messageId);
  } catch (err: any) {
    console.error("EMAIL ERROR:", err.message);
  }
}