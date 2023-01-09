"use strict";

const TodoStorage = require("./todoStorage");

class Todo {
  async getTodoList(body) {
    const response = await TodoStorage.getTodoList(body);

    return response
  }
}

module.exports = Todo;