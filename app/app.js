"use strict";

const express = require("express");
const cors = require("cors");
const home = require("./src/routes/home");
const todo = require("./src/routes/todo");
const todoLike = require("./src/routes/todoLike");
const todoComment = require("./src/routes/todocomment");
const findAccount = require("./src/routes/findAccount");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", home);
app.use("/todo", todo);
app.use("/todoLike", todoLike);
app.use("/todoComment", todoComment);
app.use("/find", findAccount);

module.exports = app;
