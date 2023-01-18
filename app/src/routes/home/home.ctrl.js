"use strict";

const Todo = require("../../models/todo/todo");
const User = require("../../models/user/user");
const TodoComment = require("../../models/todo/todoComment");

//로그인 회원가입
const sign = {
  login: (req, res) => {
    return res.json({ sucess: true });
  },
  register: (req, res) => {
    const user = new User();
    const response = user.register();
    return res.json(response);
  },
};

const todo = {
  getInfo: async (req, res) => {
    const todo = new Todo();
    const response = await todo.getTodoList(req.body);

    return res.json(response);
  },

  getCnt: async (req, res) => {
    const todo = new Todo();
    const response = await todo.getTodoCnt(req.body);

    return res.json(response);
  },

  addTodo: async (req, res) => {
    const todo = new Todo();
    const response = await todo.addTodoList(req.body);

    return res.json(response);
  },
  editTodo: async (req, res) => {
    const todo = new Todo();
    const response = await todo.editTodo(req.body);

    return res.json(response);
  },
  deleteTodo: async (req, res) => {
    const todo = new Todo();
    const response = await todo.deleteTodo(req.body);

    return res.json(response);
  },

  addTodoLike: async (req, res) => {
    const todo = new Todo();
    const response = await todo.addTodoLike(req.body);

    return res.json(response);
  },

  deleteTodoLike: async (req, res) => {
    const todo = new Todo();
    const response = await todo.deleteTodoLike(req.body);

    return res.json(response);
  },

  addTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.addComment(req.body);

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
  sign,
  todo,
};
