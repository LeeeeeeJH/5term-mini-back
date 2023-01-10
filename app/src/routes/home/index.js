"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// router.get("/",)
router.post("/login", ctrl.sign.login);
router.post("/register", ctrl.sign.register);

router.post("/diaries/:id", ctrl.process.createDiary);
router.delete("/diaries/:no", ctrl.process.deleteDiary);

module.exports = router;