const express = require("express");
const storage = require("../utils/storage");
const uploadFileInput = require("../controllers/fileController");
const process = require("process");

let postFileRouters = express.Router();

postFileRouters.post("/upload", storage.upload.array("files", process.env.FILE_INPUT_NUMBER || 2), uploadFileInput);

module.exports = postFileRouters;
