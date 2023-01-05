"use strict";

const express = require("express");
const home = require("./src/routes/home");
require("dotenv").config();

const app = express();

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", home);

module.exports = app;
//rename
