"use strict";
const db = require("../config/db");

class DataCheck {
  static async getUserNo(id) {
    const sql = "SELECT no FROM user WHERE id = ?;";
    const result = await db.query(sql, id);
    return result[0][0].no;
    try {
      const sql = "SELECT no FROM user WHERE id = ?;";
      const result = await db.query(sql, id);

      return result[0][0].no;
    } catch (error) {
      console.log("getUserNo 에러 : ", error);
    }
  }

  static async getUserNoByNickname(nickname) {
    const sql = "SELECT no FROM user WHERE nickname = ?;";
    const result = await db.query(sql, nickname);

    return result[0][0]?.no;
  }

  static async checkEmail(email) {
    try {
      const sql = "SELECT id, password, nickname FROM user WHERE email = ?;";
      const result = await db.query(sql, email);
      if (!result[0][0]) {
        return false;
      }
      return result[0][0];
    } catch (error) {
      console.log("checkEmail 에러 : ", error);
    }
  }
}

module.exports = DataCheck;
