"use strict";

const db = require("../../config/db");
const User = require("./user");

class UserStorage {
  static login(body) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT id,password FROM user";
      db.query(sql, (err, result, fields) => {
        if (err) {
          reject(err);
          console.log(err);
        }

        let idList = [];
        for (let data of result) {
          idList.push(data.id);
        }

        let passwordList = [];
        for (let data of result) {
          passwordList.push(data.password);
        }

        for (let id of idList) {
          if (id == body.id) {
            const idx = idList.indexOf(id);
            console.log(passwordList[idx]);
            if (passwordList[idx] == body.password) {
              resolve({ success: true });
            }

            resolve({ success: false });
          }
        }

        resolve({ success: false });
      });
    });
  }

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
          if (id == body.id) resolve({ success: true });
        }
        resolve({ success: false });
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
          if (nickname == body.nickname) resolve({ success: true });
        }
        resolve({ success: false });
      });
    });
  }

  static register(body) {
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
    });
  }
}

module.exports = UserStorage;
