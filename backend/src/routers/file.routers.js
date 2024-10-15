const express = require("express");
const upload = require("../utils/storage");
const uploadFileInput = require("../controllers/fileController");
const process = require("process");

let postFileRouters = express.Router();

postFileRouters.post("/upload", upload.array("files", process.env.FILE_INPUT_NUMBER || 2), uploadFileInput);

module.exports = postFileRouters;
