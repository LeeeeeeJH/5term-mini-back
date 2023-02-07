"use strict";
const Email = require("../email/email");
const DataCheck = require("./dataCheck");
const findAccountContent = require("./findAccountContent");

class FindAccount {
  async id(client) {
    try {
      const authenticationNumber = Math.floor(Math.random() * 1000000);

      const account = await DataCheck.checkEmail(client.email);
      if (!account.id) {
        return { success: false, msg: "존재하지 않는 이메일입니다." };
      }

      const emailResult = await Email.send(client.email, {
        subject: "HARU 아이디 찾기 인증번호",
        html: findAccountContent("아이디", account, authenticationNumber),
      });

      if (emailResult) {
        return { success: true, authenticationNumber, id: account.id };
      }

      return { success: false };
    } catch (error) {
      console.log("FindAccount.id 에러 : ", error);
    }
  }

  async password(client) {
    try {
      const authenticationNumber = Math.floor(Math.random() * 1000000);

      const account = await DataCheck.checkEmail(client.email);
      if (account.id !== client.id) {
        return {
          success: false,
          msg: "입력한 아이디와 이메일이 일치하지 않습니다.",
        };
      }

      const emailResult = await Email.send(client.email, {
        subject: "HARU 비밀번호 찾기 인증번호",
        html: findAccountContent("비밀번호", account, authenticationNumber),
      });

      if (emailResult && account) {
        return {
          success: true,
          authenticationNumber,
          password: account.password,
        };
      }

      return { success: false };
    } catch (error) {
      console.log("FindAccount.password 에러 : ", error);
    }
  }
}

module.exports = FindAccount;
