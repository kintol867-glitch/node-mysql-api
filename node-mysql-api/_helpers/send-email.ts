import nodemailer from "nodemailer";
import config from "../config.json";

export default async function sendEmail({
  to,
  subject,
  html,
  from = config.emailFrom,
}: any) {
  const transporter = nodemailer.createTransport(config.smtpOptions as any);
  const info = await transporter.sendMail({ from, to, subject, html });
  console.log("Email sent to:", to, "Message ID:", info.messageId, "Preview:", nodemailer.getTestMessageUrl(info));
}