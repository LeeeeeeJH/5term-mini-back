"use strict";

const { resolveInclude } = require("ejs");
const db = require("../../config/db");
const User = require("./user");

class UserStorage {
  static login() {}

  static idCheck(body) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT (id) FROM user";
      db.query(sql, (err, result, fields) => {
        if (err) {
          reject(err);
        }

        let idList = [];
        for (let data of result) {
          idList.push(data.id);
        }

        for (let id of idList) {
          if (id == body.id) {
            console.log("중복");
            resolve({ success: false });
          }
        }
        resolve({ success: true });
      });
    });
  }

  static nicknameCheck(body) {
    const sql = "SELECT (nickname) FROM user";
    db.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err);
      }
    });
  }

  static register(body) {
    const sql =
      "INSERT INTO user (id,password,name,phone,email,nickname) VALUES (?,?,?,?,?,?)";

    const values = [
      body.id,
      body.password,
      body.name,
      body.phone,
      body.email,
      body.nickname,
    ];

    db.query(sql, values, function (err, result, fields) {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = UserStorage;
