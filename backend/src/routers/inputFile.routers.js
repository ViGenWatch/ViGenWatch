const express = require("express");
const storage = require("../utils/storage");
const uploadInputFileController = require("../controllers/fileController");
const process = require("process");
const authMiddleware = require("../middlewares/authMiddleware");

let postFileRouters = express.Router();

postFileRouters.post(
  "/upload",
  storage.upload.array("files", process.env.FILE_INPUT_NUMBER || 2),
  uploadInputFileController.uploadFileInput
);

postFileRouters.post("/upload-input-files", uploadInputFileController.uploadFilesInput);
postFileRouters.post("/upload-infor-execution", authMiddleware, uploadInputFileController.uploadInforExecution);

module.exports = postFileRouters;
