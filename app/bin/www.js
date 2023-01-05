"use strict";

const app = require("../app.js");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("서버가동");
});
