const express = require("express");
const referenceController = require("../controllers/referenceController");
const referenceStorage = require("../utils/referenceStorage");
const process = require("process");
const checkInput = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authMiddleware");

let referenceRoutes = express.Router();

referenceRoutes.get("/getlist", authMiddleware, referenceController.getListReferencesController);
referenceRoutes.post(
  "/create-reference",
  referenceStorage.uploadReferenceFile.array("files", process.env.REFERENCE_FILE_INPUT_NUMBER || 5),
  checkInput.validateReferenceInput(),
  referenceController.uploadReferenceFileController
);

referenceRoutes.get("/content-file/", authMiddleware, referenceController.getContentFileReference);
referenceRoutes.get("/download-file/", authMiddleware, referenceController.onDownloadFileReference);
referenceRoutes.put("/update/:referenceId", authMiddleware, referenceController.updateReferenceControllder);

module.exports = referenceRoutes;
