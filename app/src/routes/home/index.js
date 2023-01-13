"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// router.get("/",)
router.post("/login", ctrl.sign.login);
router.post("/register", ctrl.sign.register);

router.get("/diaries/:userId", ctrl.process.getSelectDiary)
router.get("/diaries/:userId/main/:diaryId", ctrl.process.getDiary)
// router.get("/diaries/", ctrl.process.getSelectDiary)
router.post("/diaries/:userId/main/", ctrl.process.createDiary);
router.delete("/diaries/:userId/main/:diaryId", ctrl.process.deleteDiary);
router.patch("/diaries/:userId/main/:diaryId", ctrl.process.updateDiary);
// router.get("/diaries/:diary-id/comment", ctrl.process.getDiaryComment)

module.exports = router;