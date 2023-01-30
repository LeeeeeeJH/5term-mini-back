"use strict";

const express = require("express");
const home = require("./src/routes/home");
const todo = require("./src/routes/todo");
const todoLike = require("./src/routes/todoLike");
const todoComment = require("./src/routes/todocomment");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", home);
app.use("/todo", todo);
app.use("/todoLike", todoLike);
app.use("/todoComment", todoComment);

module.exports = app;
