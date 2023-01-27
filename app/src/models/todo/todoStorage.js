"use strict";
const db = require("../../config/db");
const DataCheck = require("../dataCheck");

class TodoStorage {
  static async getTodoList(client) {
    const req = [client.date, client.id];
    const sql =
      "SELECT todo.no, todo.is_checked, todo.title, todo.content, COUNT(todo_likes.todo_no) AS 'likesCnt' " +
      "FROM todo " +
      "INNER JOIN user ON todo.user_no = user.no " +
      "INNER JOIN todo_likes ON todo.`no` = todo_likes.todo_no " +
      "WHERE todo.date = ? AND user.id = ? " +
      "GROUP BY todo.no;";
    const result = await db.query(sql, req);
    return result[0];
  }

  static async getTodoCount(client) {
    const req = [client.id, client.date];
    const sql =
      "SELECT DATE_FORMAT(todo.date, '%d') AS date, COUNT(*) AS cnt " +
      "FROM todo " +
      "INNER JOIN user ON todo.user_no = user.no " +
      "WHERE user.id = ? AND DATE_FORMAT(todo.date, '%Y-%m') = ? " +
      "GROUP BY DATE_FORMAT(todo.date, '%Y-%m-%d') " +
      "ORDER BY date ASC;";

    const result = await db.query(sql, req);
    return result[0];
  }

  static async addTodoList(client) {
    const no = await DataCheck.getUserNo(client.id);
    const req = [no, client.date, client.content];
    const sql = "INSERT INTO todo (user_no, date, content) VALUES (?,?,?)";
    const result = await db.query(sql, req);

    return result[0];
  }

  static async editTodo(client) {
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
    const result = await db.query(sql, req);

    return result[0];
  }

  static async deleteTodo(client) {
    const sql = "DELETE FROM todo WHERE no= ?";
    const req = [client.id];
    const result = await db.query(sql, req);

    return result[0];
  }

  static async addTodoLike(client) {
    const sql = "INSERT INTO todo_likes (todo_no, liker_no) VALUES (?,?)";
    const user_no = await DataCheck.getUserNo(client.id);
    const req = [client.todo_no, user_no];
    const result = await db.query(sql, req);

    return result[0];
  }

  static async deleteTodoLike(client) {
    const sql = "DELETE FROM todo_likes WHERE todo_no= ? AND liker_no = ?";
    const user_no = await DataCheck.getUserNo(client.id);
    const req = [client.todo_no, user_no];
    const result = await db.query(sql, req);

    return result[0];
  }
}

module.exports = TodoStorage;
