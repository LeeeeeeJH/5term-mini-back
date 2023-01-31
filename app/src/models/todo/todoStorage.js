"use strict";
const db = require("../../config/db");

class TodoStorage {
  static async getTodoList(client) {
    try {
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
    } catch (e) {
      console.log("getTodoList 에러 : ", e);
      return { success: false };
    }
  }

  static async getTodoCount(client) {
    try {
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
    } catch (e) {
      console.log("getTodoCount 에러 : ", e);
      return { success: false };
    }
  }

  static async addTodoList(client, userNo) {
    try {
      const req = [userNo, client.date, client.title, client.content];
      const sql =
        "INSERT INTO todo (user_no, date, title,content) VALUES (?,?,?,?)";
      const addResult = (await db.query(sql, req))[0];

      return addResult;
    } catch (e) {
      console.log("addTodoList 에러 : ", e);
      return { success: false };
    }
  }

  static async editTodo(client) {
    try {
      const sql = "UPDATE todo SET content= ? WHERE no= ?;";
      const req = [client.content, client.todoNo];
      const editRsult = (await db.query(sql, req))[0].affectedRows;

      return editRsult;
    } catch (e) {
      console.log("editTodo 에러 : ", e);
      return { success: false };
    }
  }

  static async editChecked(client) {
    try {
      const sql = "UPDATE todo SET is_checked= ? WHERE no= ?;";
      const req = [client.is_checked, client.todoNo];
      const editCheckResult = (await db.query(sql, req))[0].affectedRows;

      return editCheckResult;
    } catch (e) {
      console.log("editChecked 에러 : ", e);
      return { success: false };
    }
  }

  static async deleteTodo(client) {
    try {
      const sql = "DELETE FROM todo WHERE no= ?";
      const req = [client.todoNo];
      const deleteResult = (await db.query(sql, req))[0].affectedRows;

      if (deleteResult) {
        return true;
      }

      return false;
    } catch (e) {
      console.log("deleteTodo 에러 : ", e);
      return false;
    }
  }

  static async getDate(todoNo) {
    try {
      const req = [todoNo];
      const sql = "SELECT date FROM todo WHERE no = ?";
      const result = (await db.query(sql, req))[0][0].date;

      return result;
    } catch (e) {
      console.log("getDate 에러 : ", e);
      return 0;
    }
  }

  static async getTodoCnt(date) {
    try {
      const req = [date];
      const sql = "SELECT COUNT(*) AS cnt FROM todo WHERE date = ?";
      const result = (await db.query(sql, req))[0][0].cnt;

      return result;
    } catch (e) {
      console.log("getTodoCnt 에러 : ", e);
      return 0;
    }
  }
}

module.exports = TodoStorage;
