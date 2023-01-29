"use strict";
const db = require("../../config/db");

class TodoStorage {
  static async getTodoList(client) {
    const req = [client.date, client.id];
    const sql =
      "SELECT todo.no, todo.is_checked, todo.title, todo.content, COUNT(todo_likes.todo_no) AS 'likesCnt' " +
      "FROM todo " +
      "INNER JOIN user ON todo.user_no = user.no " +
      "LEFT JOIN todo_likes ON todo.`no` = todo_likes.todo_no " +
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

  static async addTodoList(client, userNo) {
    const req = [userNo, client.date, client.title, client.content];
    const sql =
      "INSERT INTO todo (user_no, date, title,content) VALUES (?,?,?,?)";
    const addResult = (await db.query(sql, req))[0].affectedRows;
    if (addResult) {
      return { success: true };
    }
    return { success: false };
  }

  static async editTodo(client) {
    const sql = "UPDATE todo SET content= ? WHERE no= ?;";

    const req = [client.content, client.todoNo];
    const editRsult = (await db.query(sql, req))[0].affectedRows;
    if (editRsult) {
      return { success: true };
    }

    return { success: false };
  }

  static async editChecked(client) {
    const sql = "UPDATE todo SET is_checked= ? WHERE no= ?;";
    const req = [client.is_checked, client.todoNo];
    const editCheckResult = (await db.query(sql, req))[0].affectedRows;
    if (editCheckResult) {
      return { success: true };
    }

    return { success: false };
  }

  static async deleteTodo(client) {
    const sql = "DELETE FROM todo WHERE no= ?";
    const req = [client.todoNo];
    const deleteResult = (await db.query(sql, req))[0].affectedRows;

    if (deleteResult) {
      return true;
    }

    return false;
  }

  static async getDate(todoNo) {
    const req = [todoNo];
    const sql = "SELECT date FROM todo WHERE no = ?";
    const result = (await db.query(sql, req))[0][0].date;

    return result;
  }

  static async getTodoCnt(date) {
    const req = [date];
    const sql = "SELECT COUNT(*) AS cnt FROM todo WHERE date = ?";
    const result = (await db.query(sql, req))[0][0].cnt;

    return result;
  }
}

module.exports = TodoStorage;
