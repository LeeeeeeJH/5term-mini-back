"use strict";
const Email = require("../email/email");
const DataCheck = require("../dataCheck");

class FindAccount {
  async id(client) {
    const authenticationNumber = Math.floor(Math.random() * 1000000);
    const id = (await DataCheck.checkEmail(client.email)).id;
    const emailResult = await Email.send(client.email, authenticationNumber);
    console.log(id);
    console.log(emailResult);
    if (emailResult && id) {
      return { success: true, authenticationNumber, id };
    }
    if (!id) {
      return { success: false, msg: "존재하지 않는 이메일입니다." };
    }
    return { success: false };
  }
}

module.exports = FindAccount;
