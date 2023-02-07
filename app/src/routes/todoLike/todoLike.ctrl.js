"use strict";
const TodoLike = require("../../models/todoLike/todoLike");

const todoLike = {
  addTodoLike: async (req, res) => {
    const todoLike = new TodoLike();
    const response = await todoLike.addTodoLike(req.body);

    return res.json(response);
  },

  deleteTodoLike: async (req, res) => {
    const todoLike = new TodoLike();
    const response = await todoLike.deleteTodoLike(req.body);

    return res.json(response);
  },
};

module.exports = {
  todoLike,
};
