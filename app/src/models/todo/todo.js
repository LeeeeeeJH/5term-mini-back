"use strict";

const { response } = require("express");
const TodoStorage = require("./todoStorage");

class Todo {
  constructor(body) {
    this.body = body;
  }

  async getTodoList(body) {
    const response = await TodoStorage.getTodoList(body);

    return response;
  }

  async addTodoList(body) {
    const response = await TodoStorage.addTodoList(body);

    return response;
  }

  async getTodoCnt(body) {
    const response = await TodoStorage.getTodoCount(body);

    return response;
  }

  async editTodo(body) {
    const response = await TodoStorage.editTodo(body);

    return response;
  }

  async deleteTodo(body) {
    const response = await TodoStorage.deleteTodo(body);

    return response;
  }
}

module.exports = Todo;
