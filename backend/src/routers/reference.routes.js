const express = require("express");
const referenceController = require("../controllers/referenceController");
const referenceStorage = require("../utils/referenceStorage");
const process = require("process");

let referenceRoutes = express.Router();

referenceRoutes.get("/getlist", referenceController.getListReferencesController);
referenceRoutes.post(
  "/create-reference",
  referenceStorage.uploadReferenceFile.array("files", process.env.REFERENCE_FILE_INPUT_NUMBER || 5),
  referenceController.uploadReferenceFileController
);

module.exports = referenceRoutes;
