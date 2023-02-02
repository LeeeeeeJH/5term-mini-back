"use strict";
const nodemailer = require("nodemailer");

class Mail {
  static async send(email, content) {
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
      subject: "인증번호",
      text: "번호",
      html: `<p>번호 : ${content}</p>`,
    });

    if (info.messageId) {
      return true;
    }

    return false;
  }
}

module.exports = Mail;
