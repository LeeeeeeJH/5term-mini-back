"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// router.get("/",)
router.post("/login", ctrl.sign.login);
router.post("/register", ctrl.sign.register);
// todo
router.post("/todo/getTodoList", ctrl.todo.getInfo);
router.post("/todo/getTodoCnt", ctrl.todo.getCnt);
router.post("/todo", ctrl.todo.getCnt);
router.post("/todo/add", ctrl.todo.addTodo);
router.patch("/todo/edit", ctrl.todo.editTodo);
router.delete("/todo/delete", ctrl.todo.deleteTodo);
// todo 좋아요
router.post("/todo/addTodoLike", ctrl.todo.addTodoLike);
router.delete("/todo/deleteLike", ctrl.todo.deleteTodoLike);
// todo 댓글
router.post("/todo/comment/get", ctrl.todo.getTodoComment);
router.post("/todo/comment/add", ctrl.todo.addTodoComment);
router.patch("/todo/commet/edit", ctrl.todo.editTodoComment);
router.delete("/todo/comment/delete", ctrl.todo.deleteTodoComment);

module.exports = router;
