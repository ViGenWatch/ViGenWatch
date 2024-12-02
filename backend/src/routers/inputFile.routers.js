const express = require("express");
const storage = require("../utils/storage");
const uploadInputFileController = require("../controllers/fileController");
const process = require("process");

let postFileRouters = express.Router();

postFileRouters.post(
  "/upload",
  storage.upload.array("files", process.env.FILE_INPUT_NUMBER || 2),
  uploadInputFileController.uploadFileInput
);

postFileRouters.post("/upload-input-files", uploadInputFileController.uploadFilesInput);

module.exports = postFileRouters;
