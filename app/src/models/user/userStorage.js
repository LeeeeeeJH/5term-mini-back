"use strict";

const db = require("../../config/db");

class UserStorage {
  static async login(user) {
    try {
      const sql = "SELECT id,password FROM user WHERE id = ?";

      const check = await db.query(sql, user.id);
      return check;
    } catch (err) {
      console.log(err);
    }
  }

  static async idCheck(user) {
    try {
      const sql = "SELECT id FROM user WHERE id = ?";

      const check = await db.query(sql, [user.id]);
      console.log(check[0][0]);
      return check[0][0] == undefined ? { success: true } : { success: false };
    } catch (err) {
      console.log(err);
    }
  }

  static async nicknameCheck(user) {
    try {
      const sql = "SELECT nickName FROM user WHERE nickName = ?";

      const check = await db.query(sql, [user.nickName]);
      console.log(check[0]);
      return check[0][0] == undefined ? { success: true } : { success: false };
    } catch (err) {
      console.log(err);
    }
  }

  static async register(values) {
    try {
      const sql =
        "INSERT INTO user (id,password,name,phone,email,nickname) VALUES (?,?,?,?,?,?)";

      const insetResult = await db.query(sql, values);
      return insetResult[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserStorage;
