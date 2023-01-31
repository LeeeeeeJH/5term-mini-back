"use strict";

const TodoStorage = require("./todoStorage");
const todoCommentStorage = require("../todoComment/todoCommentStorage");
const DataCheck = require("../dataCheck");

class Todo {
  async getTodoList(params) {
    const result = await TodoStorage.getTodoList(params);

    return result;
  }

  async getTodoCnt(params) {
    const result = await TodoStorage.getTodoCount(params);

    return result;
  }

  async addTodoList(body) {
    const userNo = await DataCheck.getUserNo(body.id);
    const result = await TodoStorage.addTodoList(body, userNo);
    if (result.affectedRows) {
      return { success: true, todoNo: result.insertId };
    }
    return { success: false };
  }

  async editTodo(body) {
    const result = await TodoStorage.editTodo(body);
    if (result) {
      return { success: true };
    }

    return { success: false };
  }

  async editChecked(body) {
    const result = await TodoStorage.editChecked(body);
    if (result) {
      return { success: true };
    }

    return { success: false };
  }

  async deleteTodo(body) {
    try {
      const date = await TodoStorage.getDate(body.todoNo);
      const todoDelResult = await TodoStorage.deleteTodo(body);
      const cnt = await TodoStorage.getTodoCnt(date);
      if (cnt === 0) {
        const cmtDelResult = todoCommentStorage.deleteComment(date);
        if (todoDelResult && cmtDelResult) {
          return { success: true };
        }
      }
      if (todoDelResult) {
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log("deleteTodo(models) 에러 : ", e);
    }
  }
}

module.exports = Todo;
