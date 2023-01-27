"use strict";
const db = require("../config/db");

class DataCheck {
  static async getUserNo(id) {
    const sql = "SELECT no FROM user WHERE id = ?;";
    const result = await db.query(sql, id);

    return result[0][0].no;
  }

  static async getUserImage(id) {
    const sql = "SELECT image FROM user WHERE id = ?;";
    const result = await db.query(sql, id);

    return result[0][0].image;
  }
}

module.exports = DataCheck;
