"use strict";

const express = require("express");
const friends = require("./src/routes/friends");
const user = require("./src/routes/user");

const cors = require("cors");
const todo = require("./src/routes/todo");
const todoLike = require("./src/routes/todoLike");
const todoComment = require("./src/routes/todocomment");
const findAccount = require("./src/routes/findAccount");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/friends", friends);
app.use("/sign", user);
app.use("/todo", todo);
app.use("/todoLike", todoLike);
app.use("/todoComment", todoComment);
app.use("/find", findAccount);

module.exports = app;
