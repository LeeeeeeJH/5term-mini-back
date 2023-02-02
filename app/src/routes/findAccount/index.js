"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./find.ctrl");

router.post("/id", ctrl.findAccount.id);
// router.post("/password", ctrl.emailCheck.send);

module.exports = router;
