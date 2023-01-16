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
          if (id == body.id) resolve({ success: false });
        }
        resolve({ success: true });
      });
    });
  }

  static nicknameCheck(body) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT (nickname) FROM user";
      db.query(sql, (err, result, fields) => {
        if (err) {
          reject(err);
        }

        let nicknameList = [];
        for (let data of result) {
          nicknameList.push(data.nickname);
        }

        for (let nickname of nicknameList) {
          if (nickname == body.nickname) resolve({ success: false });
        }
        resolve({ success: true });
      });
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
