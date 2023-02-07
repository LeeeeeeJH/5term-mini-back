"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./todo.ctrl");

router.get("/list/:id/:date", ctrl.todo.getTodoList);
router.get("/friendList/:id/:date/:userId", ctrl.todo.getFriendTodoList);
router.get("/cnt/:id/:date", ctrl.todo.getCnt);
router.post("/", ctrl.todo.createTodo);
router.patch("/", ctrl.todo.editTodo);

router.patch("/checked", ctrl.todo.editChecked);
router.delete("/", ctrl.todo.deleteTodo);

module.exports = router;
