"use strict";
const db = require("../../config/db");
const DataCheck = require("../dataCheck");
const todoCommentStorage = require("./todoCommentStorage");

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
    console.log(client);
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
    const result = { success: false };
    const isCheck = (await db.query(sql, req))[0].affectedRows;
    if (isCheck) result.success = true;

    return result;
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
    const result = { success: false };
    const isCheck = (await db.query(sql, req))[0].affectedRows;
    if (isCheck) {
      result.success = true;
    }

    return result;
  }

  static async deleteTodo(client) {
    const date = await this.getDate(client.id);
    const sql = "DELETE FROM todo WHERE no= ?";
    const req = [client.id];
    const result = { success: false };
    let cmtDeleteResult = true;
    const todoDeleteResult = (await db.query(sql, req))[0].affectedRows;

    const cnt = await this.getTodoCnt(date);
    if (cnt === 0) {
      cmtDeleteResult = todoCommentStorage.deleteComment(date);
    }
    if (todoDeleteResult && cmtDeleteResult) {
      result.success = true;
    }

    return result;
  }

  static async addTodoLike(client) {
    const sql = "INSERT INTO todo_likes (todo_no, liker_no) VALUES (?,?)";
    const user_no = await DataCheck.getUserNo(client.id);
    const req = [client.todo_no, user_no];
    const result = { success: false };
    const isCheck = (await db.query(sql, req))[0].affectedRows;
    if (isCheck) result.success = true;

    return result;
  }

  static async deleteTodoLike(client) {
    const sql = "DELETE FROM todo_likes WHERE todo_no= ? AND liker_no = ?";
    const user_no = await DataCheck.getUserNo(client.id);
    const req = [client.todo_no, user_no];
    const result = { success: false };
    const isCheck = (await db.query(sql, req))[0].affectedRows;
    if (isCheck) result.success = true;

    return result;
  }

  static async getDate(no) {
    const req = [no];
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
