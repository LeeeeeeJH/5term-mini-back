"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// router.get("/",)
router.post("/login", ctrl.sign.login);
router.post("/register", ctrl.sign.register);
router.post("/todo/getTodoList", ctrl.info.getInfo);
router.post("/todo", ctrl.info.getCnt);
router.post("/todo/add", ctrl.info.addTodo);
router.patch("/todo/edit", ctrl.info.editTodo);
router.delete("/todo/delete", ctrl.info.deleteTodo);

module.exports = router;
