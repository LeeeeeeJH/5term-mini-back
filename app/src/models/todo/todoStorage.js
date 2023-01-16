"use strict";
const db = require("../../config/db");
const DataCheck = require("../dataCheck");

class TodoStorage {
  static getTodoList(client) {
    return new Promise((resolve, reject) => {
      const req = [client.date, client.id];

      const sql =
        "SELECT todo.no, todo.is_checked, todo.content " +
        "FROM todo " +
        "INNER JOIN user ON todo.user_no = user.no " +
        "WHERE date_format( todo.created_date , '%Y-%m') = ? AND user.id = ?;";

      db.query(sql, req, (err, client) => {
        if (err) {
          console.log("에러", err);
          reject({ sucess: false, msg: "실패" });
        }
        resolve(client);
      });
    });
  }

  static getTodoCount(client) {
    return new Promise(async (resolve, reject) => {
      const req = [client.id, client.date];
      const sql =
        "SELECT DATE_FORMAT(todo.date, '%d') AS date, COUNT(*) AS cnt " +
        "FROM todo " +
        "INNER JOIN user ON todo.user_no = user.no " +
        "WHERE user.id = ? AND DATE_FORMAT(todo.date, '%Y-%m') = ? " +
        "GROUP BY DATE_FORMAT(todo.date, '%Y-%m-%d') " +
        "ORDER BY date ASC;";

      db.query(sql, req, (err, client) => {
        if (err) {
          console.log("에러", err);
          reject({ sucess: false, msg: "실패" });
        }
        resolve(client);
      });
    });
  }

  static addTodoList(client) {
    return new Promise(async (resolve, reject) => {
      const no = await DataCheck.getUserNo(client.id);
      const req = [no, client.date, client.content];

      const sql = "INSERT INTO todo (user_no, date, content) VALUES (?,?,?)";

      db.query(sql, req, (err) => {
        if (err) {
          console.log("에러 :", err);
          reject({ sucess: false, msg: "실패" });
        }
        resolve({ sucess: true });
      });
    });
  }

  static editTodo(client) {
    return new Promise((resolve, reject) => {
      let sql;
      let update;
      if (client.is_checked == 0 || client.is_checked == 1) {
        sql = "UPDATE todo SET is_checked= ? WHERE no= ?;";
        update = client.is_checked;
      } else {
        sql = "UPDATE todo SET content= ? WHERE no= ?;";
        update = client.content;
      }
      const req = [update, client.id];

      db.query(sql, req, (err) => {
        if (err) {
          console.log(err);
          reject({ success: false, msg: "수정 실패" });
        }
        resolve({ success: true });
      });
    });
  }

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

  static deleteTodo(client) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM todo WHERE no= ?";
      const req = [client.id];
      db.query(sql, req, (err) => {
        if (err) {
          console.log(err);
          reject({ success: false, msg: "일정 삭제 실패" });
        }
        resolve({ success: true });
      });
    });
  }
}

module.exports = TodoStorage;
