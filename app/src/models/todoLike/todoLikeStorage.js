"use strict";
const db = require("../../config/db");

class TodoLikeStorage {
  static async addTodoLike(todo_no, user_no) {
    try {
      const sql = "INSERT INTO todo_likes (todo_no, liker_no) VALUES (?,?)";
      const req = [todo_no, user_no];
      const addTodoLikeResult = (await db.query(sql, req))[0].affectedRows;
      if (addTodoLikeResult) {
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log("addTodoLike 에러 : ", e);
      return { success: false };
    }
  }

  static async deleteTodoLike(todo_no, user_no) {
    try {
      const sql = "DELETE FROM todo_likes WHERE todo_no= ? AND liker_no = ?";
      const req = [todo_no, user_no];
      const delTodoLikeResult = (await db.query(sql, req))[0].affectedRows;
      if (delTodoLikeResult) {
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log("deleteTodoLike 에러 : ", e);
      return { success: false };
    }
  }
}

module.exports = TodoLikeStorage;
