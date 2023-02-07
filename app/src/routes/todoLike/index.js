"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./todoLike.ctrl");

router.post("/", ctrl.todoLike.createTodoLike);
router.delete("/", ctrl.todoLike.deleteTodoLike);

module.exports = router;
