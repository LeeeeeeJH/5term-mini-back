"use strict";
const db = require("../../config/db");
const DataCheck = require("../dataCheck");

class TodoStorage {
  static getTodoList(client) {
    return new Promise(async (resolve, reject) => {
      const req = [client.date, client.id];
      const sql =
        "SELECT todo.no, todo.is_checked, todo.title, todo.content, COUNT(todo_likes.todo_no) AS 'likesCnt' " +
        "FROM todo " +
        "INNER JOIN user ON todo.user_no = user.no " +
        "INNER JOIN todo_likes ON todo.`no` = todo_likes.todo_no " +
        "WHERE todo.date = ? AND user.id = ? " +
        "GROUP BY todo.no;";

      db.query(sql, req, (err, data) => {
        if (err) {
          console.log("에러", err);
          reject({ sucess: false });
        }
        resolve(data);
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
          reject({ sucess: false });
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
          reject({ sucess: false });
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
          reject({ success: false });
        }
        resolve({ success: true });
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
          reject({ success: false });
        }
        resolve({ success: true });
      });
    });
  }

  static addTodoLike(client) {
    return new Promise(async (resolve, reject) => {
      const sql = "INSERT INTO todo_likes (todo_no, liker_no) VALUES (?,?)";
      const user_no = await DataCheck.getUserNo(client.id);
      const req = [client.todo_no, user_no];
      console.log(req);
      db.query(sql, req, (err) => {
        if (err) {
          console.log(err);
          reject({ success: false });
        }
        resolve({ success: true });
      });
    });
  }

  static deleteTodoLike(client) {
    return new Promise(async (resolve, reject) => {
      const sql = "DELETE FROM todo_likes WHERE todo_no= ? AND liker_no = ?";
      const user_no = await DataCheck.getUserNo(client.id);
      const req = [client.todo_no, user_no];
      db.query(sql, req, (err) => {
        if (err) {
          console.log(err);
          reject({ success: false });
        }
        resolve({ success: true });
      });
    });
  }
}

module.exports = TodoStorage;
