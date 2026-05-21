import nodemailer from "nodemailer";

export default async function sendEmail({
  to,
  subject,
  html,
}: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    } as any);
    const info = await transporter.sendMail({
      from: "noreply@auth-app.com",
      to,
      subject,
      html,
    });
    console.log("Email sent to:", to, "Message ID:", info.messageId);
  } catch (err: any) {
    console.error("EMAIL ERROR:", err.message);
  }
}