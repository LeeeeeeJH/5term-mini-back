"use strict";

const db = require("../config/db");
const User = require("./user");

class UserStorage {
  static login() {}
  static register(body) {
    let sql =
      "INSERT INTO user (id,password,phone,email,nickname) VALUES (?,?,?,?,?)";

    const values = [
      body.id,
      body.password,
      body.phone,
      body.email,
      body.nickname,
    ];

    return db.query(sql, values, function (err, result, fields) {
      if (err) {
        console.log(err);
        return { sucess: false };
      } else return { sucess: true };
    });
  }

  static getInfo(body) {
    const id = body.id;
    const date = body.date;
    const sql = "SELECT todo.is_checked, todo.title, todo.content, date_format( todo.created_date , '%y-%m') creat_date, user.id" +
    " FROM todo INNER JOIN post_info ON todo.post_no = post_info.no INNER JOIN user ON post_info.user_no = user.no" +
    " WHERE date_format( todo.created_date , '%y-%m') = ? AND user.id = ?;"

    // console.log(sql);
    return new Promise((resolve, reject) => {
      db.query(sql, [date, id], (err, data) => {
        if(err) {
          console.log('에러',err);
          reject({sucess: false, msg: '실패'});
        }
        resolve(data);
      })
    })
  }

}

module.exports = UserStorage;
