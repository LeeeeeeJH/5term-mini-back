"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./todoComment.ctrl");

router.get("/:id/:date", ctrl.todoComment.getTodoComment);
router.post("/", ctrl.todoComment.createTodoComment);
router.patch("/", ctrl.todoComment.editTodoComment);
router.delete("/", ctrl.todoComment.deleteTodoComment);

module.exports = router;
