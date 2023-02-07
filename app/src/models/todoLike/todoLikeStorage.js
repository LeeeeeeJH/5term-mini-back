"use strict";
const db = require("../../config/db");

class TodoLikeStorage {
  static async createTodoLike(todo_no, user_no) {
    try {
      const sql = "INSERT INTO todo_likes (todo_no, liker_no) VALUES (?,?)";
      const req = [todo_no, user_no];

      const createTodoLikeResult = (await db.query(sql, req))[0].affectedRows;

      return createTodoLikeResult;
    } catch (error) {
      console.log("addTodoLike 에러 : ", error);
      return false;
    }
  }

  static async deleteTodoLike(todo_no, user_no) {
    try {
      const sql = "DELETE FROM todo_likes WHERE todo_no= ? AND liker_no = ?";
      const req = [todo_no, user_no];

      const delTodoLikeResult = (await db.query(sql, req))[0].affectedRows;

      return delTodoLikeResult;
    } catch (error) {
      console.log("deleteTodoLike 에러 : ", error);
      return false;
    }
  }
}

module.exports = TodoLikeStorage;
