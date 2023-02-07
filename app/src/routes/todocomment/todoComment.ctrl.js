"use strict";
const TodoComment = require("../../models/todoComment/todoComment");

const todoComment = {
  getTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.getComment(req.params);

    return res.json(response);
  },

  createTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.createComment(req.body);

    return res.json(response);
  },

  editTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.editComment(req.body);

    return res.json(response);
  },

  deleteTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.deleteComment(req.body);

    return res.json(response);
  },
};

module.exports = {
  todoComment,
};
