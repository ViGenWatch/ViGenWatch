const CustomError = require("../entity/customError");
const executionService = require("../services/executionService");
const executionHelper = require("../utils/execution");
const process = require("process");
const storage = require("../utils/storage");
const path = require("path");

const getListExecutionController = async (req, res) => {
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
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getOutputJsonController = async (req, res) => {
  try {
    const execution = await executionService.getExecutionById(req.params.executionId);
    if (execution) {
      const executionPath = execution.executionPath;
      await executionHelper.getAuspiceOutputJson(executionPath, res);
    } else {
      throw new CustomError("Execution Not Found", 400);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getContentFileController = async (req, res) => {
  try {
    const filePath = decodeURIComponent(req.query.path);
    const _uploadPath = storage.uploadPath();
    const fullFilePath = path.join(_uploadPath, filePath);
    await executionHelper.getContentFile(fullFilePath, res);
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const downloadFileController = async (req, res) => {
  try {
    const filePath = decodeURIComponent(req.query.filePath);
    const _uploadPath = storage.uploadPath();
    const fullFilePath = path.join(_uploadPath, filePath);
    await executionHelper.onDownloadFile(fullFilePath, res);
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getListExecutionController,
  getOutputJsonController,
  getContentFileController,
  downloadFileController
};
