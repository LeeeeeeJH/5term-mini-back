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
              console.log("성공");
              resolve({ success: true });
            }
            console.log("비번 다름");
            resolve({ success: false, msg: "비밀번호가 맞지 않습니다." });
          }
        }
        console.log("아이디 다름");
        resolve({ success: false, msg: "존재하지 않는 아이디 입니다." });
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
          if (id == body.id)
            resolve({ success: true, msg: "이미 존재하는 아이디입니다." });
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
          if (nickname == body.nickname)
            resolve({ success: true, msg: "이미 존재하는 별명입니다." });
        }
        resolve({ success: false });
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
