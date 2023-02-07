"use strict";
const nodemailer = require("nodemailer");

class Mail {
  static async send(email, content) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.Email_id,
          pass: process.env.Email_password,
        },
      });

      const info = await transporter.sendMail({
        from: `"HARU Service" <wnswns012@gmail.com>`,
        to: `${email}`,
        subject: content.subject,
        html: content.html,
      });

      if (info.messageId) {
        return true;
      }

      return false;
    } catch (error) {
      console.log("send 에러 : ", error);
    }
  }
}

module.exports = Mail;
