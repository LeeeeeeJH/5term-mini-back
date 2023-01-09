"use strict";
const db = require("../../config/db");

class TodoStorage {
  static getTodoList(client) {
    const sql = "SELECT todo.is_checked, todo.title, todo.content, date_format( todo.created_date , '%y-%m') creat_date, user.id" +
    " FROM todo INNER JOIN post_info ON todo.post_no = post_info.no INNER JOIN user ON post_info.user_no = user.no" +
    " WHERE date_format( todo.created_date , '%y-%m') = ? AND user.id = ?;"

    const req =[
      client.date,
      client.id
    ]

    return new Promise((resolve, reject) => {
      db.query(sql, req, (err, data) => {
        if(err) {
          console.log('에러',err);
          reject({sucess: false, msg: '실패'});
        }
        resolve(data);
      })
    })
  }
}

module.exports = TodoStorage;