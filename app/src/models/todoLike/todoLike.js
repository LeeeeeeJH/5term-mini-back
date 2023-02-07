"use strict";

const TodoLikeStorage = require("./todoLikeStorage");
const DataCheck = require("../user/dataCheck");

class TodoLike {
  async createTodoLike(body) {
    const user_no = await DataCheck.getUserNo(body.id);

    const result = await TodoLikeStorage.addTodoLike(body.todo_no, user_no);

    if (!result) {
      return { success: false };
    }

    return { success: true };
  }

  async deleteTodoLike(body) {
    const user_no = await DataCheck.getUserNo(body.id);
    const result = await TodoLikeStorage.deleteTodoLike(body.todo_no, user_no);

    if (!result) {
      return { success: false };
    }

    return { success: true };
  }
}

module.exports = TodoLike;
