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
          user: "wnswns012@gmail.com",
          pass: "fdzzrbkkaipvvkvy",
        },
      });

      const info = await transporter.sendMail({
        from: `"HARU" <wnswns012@gmail.com>`,
        to: `${email}`,
        subject: content.subject,
        html: content.html,
      });

      if (info.messageId) {
        return true;
      }

      return false;
    } catch (e) {
      console.log("send 에러 : ", e);
    }
  }
}

module.exports = Mail;
