"use strict";

const TodoStorage = require("./todoStorage");
const DataCheck = require("../user/dataCheck");

class Todo {
  async getTodoList(data) {
    const result = await TodoStorage.getTodoList(data);

    return result;
  }

  async getFriendTodoList(data) {
    const todoList = await TodoStorage.getTodoList(data);
    const userNo = await DataCheck.getUserNo(data.userId);
    for (const todo of todoList) {
      const likeCheck = await TodoStorage.likeCheck(todo.no, userNo);
      if (likeCheck) {
        todo["likeChecked"] = true;
      } else {
        todo["likeChecked"] = false;
      }
    }

    return todoList;
  }

  async getTodoCnt(data) {
    const result = await TodoStorage.getTodoCount(data);

    return result;
  }

  async createTodoList(data) {
    const userNo = await DataCheck.getUserNo(data.id);
    const result = await TodoStorage.createTodoList(data, userNo);
    if (!result.affectedRows) {
      return { success: false };
    }
    return { success: true, todoNo: result.insertId };
  }

  async editTodo(data) {
    const result = await TodoStorage.editTodo(data);
    if (!result) {
      return { success: false };
    }

    return { success: true };
  }

  async editChecked(data) {
    const result = await TodoStorage.editChecked(data);
    if (!result) {
      return { success: false };
    }

    return { success: true };
  }

  async deleteTodo(data) {
    try {
      const date = await TodoStorage.getDate(data.todoNo);
      const todoDelResult = await TodoStorage.deleteTodo(data);
      if (!todoDelResult) {
        return { success: false };
      }

      const cnt = await TodoStorage.getTodoCnt(date);
      if (cnt === 0) {
        const commentDelResult = TodoStorage.deleteComment(date);
        if (!commentDelResult) {
          return { success: false };
        }
      }

      return { success: true };
    } catch (e) {
      console.log("deleteTodo(models) 에러 : ", e);
    }
  }
}

module.exports = Todo;
