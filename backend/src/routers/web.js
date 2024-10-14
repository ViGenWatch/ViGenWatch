const express = require("express");
const postFileRouter = require("./file.routers");

let router = express.Router();
router.use("/file", postFileRouter);
module.exports = router;
