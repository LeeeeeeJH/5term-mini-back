"use strict";

const db = require("../../config/db");
const Friends = require("./friends");

class FriendsStorage {
  static send(body) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO friends_list (sender,receiver) VALUES (?,?)";
      const values = [body.sender, body.receiver];
      db.query(sql, values, function (err, result, fields) {
        if (err) {
          console.log(err);
        }
        resolve({ success: true });
      });
    });
  }
  static aceppt(body) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE friends_list SET is_aceppted = 1 WHERE no = ?";
      db.query(sql, [body.no], function (err, result, fields) {
        if (err) {
          console.log(err);
        }
        resolve({ success: true });
      });
    });
  }

  static reject(body) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM friends_list WHERE no = ?";
      db.query(sql, [body.no], function (err, result, fields) {
        if (err) console.log(err);
        resolve({ success: true });
      });
    });
  }
}

module.exports = FriendsStorage;
