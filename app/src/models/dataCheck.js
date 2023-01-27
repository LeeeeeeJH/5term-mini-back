"use strict";
const db = require("../config/db");

class DataCheck {
  static getUserNo(id) {
    return new Promise((resolve, reject) => {
      const req = [id];

      const sql = "SELECT no FROM user WHERE id = ?;";

      db.query(sql, req, (err, client) => {
        if (err) reject(err);

        resolve(client[0].no);
      });
    });
  }

  static getProfileImage(no) {
    return new Promise((resolve, reject) => {
      const req = [no];

      const sql = "SELECT image FROM user WHERE no = ?;";

      db.query(sql, req, (err, client) => {
        if (err) reject(err);

        resolve(client[0].image);
      });
    });
  }
}

module.exports = DataCheck;
