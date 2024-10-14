const express = require("express");
const upload = require("../utils/storage");
const uploadFileInput = require("../controllers/fileController");

let postFileRouter = express.Router();

postFileRouter.post("/upload", upload.single("file"), uploadFileInput);

module.exports = postFileRouter;
