"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./todo.ctrl");

router.get("/list/:id/:date", ctrl.todo.getInfo);
router.get("/cnt/:id/:date", ctrl.todo.getCnt);
router.post("/", ctrl.todo.addTodo);
router.patch("/", ctrl.todo.editTodo);
router.patch("/checked", ctrl.todo.editChecked);
router.delete("/", ctrl.todo.deleteTodo);

module.exports = router;
