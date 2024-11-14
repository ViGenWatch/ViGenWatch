const express = require("express");
const referenceController = require("../controllers/referenceController");
const referenceStorage = require("../utils/referenceStorage");
const process = require("process");
const checkInput = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authMiddleware");
const verifyRole = require("../middlewares/verifyRole");

let referenceRoutes = express.Router();

//role user 0x01
referenceRoutes.get("/getlist", authMiddleware, referenceController.getListReferencesController);
referenceRoutes.post(
  "/create-reference",
  referenceStorage.uploadReferenceFile.array("files", process.env.REFERENCE_FILE_INPUT_NUMBER || 5),
  checkInput.validateReferenceInput(),
  referenceController.uploadReferenceFileController
);

//role user 0x02
referenceRoutes.get(
  "/0x02/getlist",
  authMiddleware,
  verifyRole.VerifyRoleAuthority,
  referenceController.getListReferencesRoleAuthorityController
);

//role user 0x01 0x02
referenceRoutes.get("/content-file/", authMiddleware, referenceController.getContentFileReference);
referenceRoutes.get("/download-file/", authMiddleware, referenceController.onDownloadFileReference);
referenceRoutes.put("/update/:referenceId", authMiddleware, referenceController.updateReferenceControllder);
module.exports = referenceRoutes;
