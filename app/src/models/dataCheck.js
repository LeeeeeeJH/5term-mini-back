"use strict";
const db = require("../config/db");

class DataCheck {
  static async getUserNo(id) {
    try {
      const sql = "SELECT no FROM user WHERE id = ?;";
      const result = await db.query(sql, id);

      return result[0][0].no;
    } catch (e) {
      console.log("getUserNo 에러 : ", e);
    }
  }

  static async checkEmail(email) {
    const sql = "SELECT id, password FROM user WHERE email = ?;";
    const result = await db.query(sql, email);

    return result[0][0];
  }
}

module.exports = DataCheck;
