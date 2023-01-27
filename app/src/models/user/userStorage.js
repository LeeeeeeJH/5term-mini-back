"use strict";

const db = require("../../config/db");
const User = require("./user");

class UserStorage {
  static async login(body) {
    try {
      const sql = "SELECT id,password FROM user WHERE id = ?";

      const check = await db.query(sql, body.id);
      if (check[0][0]) {
        if (check[0][0].password === body.passWord) {
          return { success: true };
        } else return { success: false };
      } else return { success: false };
    } catch (err) {
      console.log(err);
    }
  }

  static async idCheck(body) {
    try {
      const sql = "SELECT id FROM user WHERE id = ?";
      const check = await db.query(sql, [body.id]);
      if (check[0][0]) return { success: true };
      else return { success: false };
    } catch (err) {
      console.log(err);
    }
  }

  static async nicknameCheck(body) {
    try {
      const sql = "SELECT nickName FROM user WHERE nickName = ?";
      const check = await db.query(sql, [body.nickName]);
      if (check[0][0]) return { success: true };
      else return { success: false };
    } catch (err) {
      console.log(err);
    }
  }

  static async register(body) {
    try {
      const sql =
        "INSERT INTO user (id,password,name,phone,email,nickname) VALUES (?,?,?,?,?,?)";

      const phoneNum = "010-" + body.senterPhoneNum + "-" + body.lastPhoneNum;
      const email = body.firstEmaile + body.lastEmaile;
      const values = [
        body.id,
        body.password,
        body.name,
        phoneNum,
        email,
        body.nickName,
      ];

      db.query(sql, values);
      return { success: true };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserStorage;
