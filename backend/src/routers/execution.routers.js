const express = require("express");
const executionController = require("../controllers/executionController");
const authMiddleware = require("../middlewares/authMiddleware");

let executionRoutes = express.Router();

executionRoutes.get("/list-executions", authMiddleware, executionController.getListExecutionController);
executionRoutes.get("/output-json/:executionId", authMiddleware, executionController.getOutputJsonController);
executionRoutes.get("/content-file", authMiddleware, executionController.getContentFileController);
executionRoutes.get("/download-file", authMiddleware, executionController.downloadFileController);

module.exports = executionRoutes;
