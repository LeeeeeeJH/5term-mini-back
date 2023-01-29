"use strict";
const db = require("../../../config/db");

class TodoLikeStorage {
  static async addTodoLike(todo_no, user_no) {
    const sql = "INSERT INTO todo_likes (todo_no, liker_no) VALUES (?,?)";
    const req = [todo_no, user_no];
    const result = { success: false };
    const addTodoLikeResult = (await db.query(sql, req))[0].affectedRows;
    if (addTodoLikeResult) {
      return { success: true };
    }

    return { success: false };
  }

  static async deleteTodoLike(todo_no, user_no) {
    const sql = "DELETE FROM todo_likes WHERE todo_no= ? AND liker_no = ?";
    const req = [todo_no, user_no];
    const delTodoLikeResult = (await db.query(sql, req))[0].affectedRows;
    if (delTodoLikeResult) {
      return { success: true };
    }

    return { success: false };
  }
}

module.exports = TodoLikeStorage;
