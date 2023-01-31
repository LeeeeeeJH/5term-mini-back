"use strict";

const express = require("express");
const home = require("./src/routes/home");
const diary = require("./src/routes/diary");
const diaryComment = require("./src/routes/diaryComment");
const diaryLike = require("./src/routes/diaryLike");
const profile = require("./src/routes/profile");
require("dotenv").config();

const app = express();

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", home);
app.use("/diaries", diary);
app.use("/diary-comments", diaryComment);
app.use("/diary-likes", diaryLike);
app.use("/profiles", profile);

module.exports = app;
//1-6 rename
