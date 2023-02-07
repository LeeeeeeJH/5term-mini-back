"use strict";

const TodoLikeStorage = require("./todoLikeStorage");
const DataCheck = require("../dataCheck");

class TodoLike {
  async getTodoLikes(body) {
    const result = await TodoLikeStorage.getTodoLikes(body);

    return result;
  }

  async addTodoLike(body) {
    const user_no = await DataCheck.getUserNo(body.id);
    const result = await TodoLikeStorage.addTodoLike(body.todo_no, user_no);

    return result;
  }

  async deleteTodoLike(body) {
    const user_no = await DataCheck.getUserNo(body.id);
    const result = await TodoLikeStorage.deleteTodoLike(body.todo_no, user_no);

    return result;
  }
}

module.exports = TodoLike;
