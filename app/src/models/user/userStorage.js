"use strict";

const db = require("../../config/db");
const User = require("./user");

class UserStorage {
  static login(body) {
    return new Promise((resolve, reject) => {
      const idSql = "SELECT id FROM user WHERE id = ?";
      const passwordSql = "SELECT password FROM user WHERE password = ?";

      db.query(idSql, [body.id], (err, result, fields) => {
        console.log(result);
        if (result[0]) {
          db.query(passwordSql, [body.passWord], (err, result, fields) => {
            console.log(result);
            if (result[0]) resolve({ success: true });
            else resolve({ success: false });
          });
        } else resolve({ success: false });
      });
    });
  }

  static idCheck(body) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT (id) FROM user WHERE id = ?";
      db.query(sql, [body.id], (err, result, fields) => {
        if (err) {
          reject(err);
        }

        if (result[0]) resolve({ success: false });
        else resolve({ success: true });
      });
    });
  }

  static nicknameCheck(body) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT (nickname) FROM user WHERE id = ?";
      db.query(sql, body.nickName, (err, result, fields) => {
        if (err) {
          reject(err);
        }
        if (result[0]) resolve({ success: false });
        else resolve({ success: true });
      });
    });
  }

  static register(body) {
    return new Promise((resolve, reject) => {
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

      db.query(sql, values, function (err, result, fields) {
        if (err) {
          console.log(err);
        }
        resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
