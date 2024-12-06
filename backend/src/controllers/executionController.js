const executionService = require("../services/executionService");
const executionHelper = require("../utils/execution");
const process = require("process");
const storage = require("../utils/storage");
const path = require("path");

const getListExecutionController = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user.id;
    const executions = await executionService.getListExecutions(userId);
    if (executions) {
      return res.status(200).json({
        message: "Get list execution successfull",
        data: executions
      });
    }
  } catch (error) {
    next(error);
  }
};

const getOutputJsonController = async (req, res, next) => {
  try {
    const execution = await executionService.getExecutionById(req.params.executionId);
    if (execution) {
      const executionPath = execution.executionPath;
      await executionHelper.getAuspiceOutputJson(executionPath, res);
    } else {
      throw new Error("Execution Not Found", 400);
    }
  } catch (error) {
    next(error);
  }
};

const getContentFileController = async (req, res, next) => {
  try {
    const filePath = decodeURIComponent(req.query.path);
    const _uploadPath = storage.uploadPath();
    const fullFilePath = path.join(_uploadPath, filePath);
    await executionHelper.getContentFile(fullFilePath, res);
  } catch (error) {
    next(error);
  }
};

const downloadFileController = async (req, res, next) => {
  try {
    const filePath = decodeURIComponent(req.query.filePath);
    const _uploadPath = storage.uploadPath();
    const fullFilePath = path.join(_uploadPath, filePath);
    await executionHelper.onDownloadFile(fullFilePath, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListExecutionController,
  getOutputJsonController,
  getContentFileController,
  downloadFileController
};
