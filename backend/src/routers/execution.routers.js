const express = require("express");
const executionController = require("../controllers/executionController");

let executionRoutes = express.Router();

executionRoutes.get("/list-executions/:userId", executionController.getListExecutionController);
executionRoutes.get("/output-json/:executionId", executionController.getOutputJsonController);
executionRoutes.get("/content-file", executionController.getContentFileController);

module.exports = executionRoutes;
