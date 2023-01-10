"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// router.get("/",)
router.post("/login", ctrl.sign.login);
router.post("/register", ctrl.sign.register);


router.get("/diaries/:id", ctrl.process.getDiary)
router.post("/diaries/:id", ctrl.process.createDiary);
router.delete("/diaries/:id/:date/:title/:content/:image", ctrl.process.deleteDiary);
router.patch("/diaries/:id", ctrl.process.updateDiary);

module.exports = router;