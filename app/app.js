"use strict";

const express = require("express");
const friends = require("./src/routes/friends");
const user = require("./src/routes/user");

require("dotenv").config();

const app = express();

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/friends", friends);
app.use("/sign", user);

module.exports = app;
