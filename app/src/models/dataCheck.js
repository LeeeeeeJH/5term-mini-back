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
}

module.exports = DataCheck;
