"use strict";
const db = require("../config/db");

class DataCheck {
  static getUserNo(id) {
    return new Promise((resolve, reject) => {
      const req = [id];

      const sql = "SELECT no FROM user WHERE id = ?;";

      db.query(sql, req, (err, client) => {
        if (err) reject(err);
        console.log();
        resolve(client[0].no);
      });
    });
  }
}

module.exports = DataCheck;
