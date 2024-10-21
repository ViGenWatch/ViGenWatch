const workspace = require("../utils/workspace");
const executionService = require("../services/executionService");
const execution = require("../utils/execution");
const storage = require("../utils/storage");
const CustomError = require("../entity/customError");
const path = require("path");

const outputExecutionMiddleware = async (req) => {
  try {
    const { userName, userId } = req.body;
    const workspaceName = workspace.formatWorkspaceName(userName);
    const workspacePath = storage.uploadPath(workspaceName);
    const executionNumber = await executionService.getNextExecutionNumber(userId);
    const configPath = path.resolve(__dirname, "../../upload/config/zika_config");
    const result = await execution.createOutputExecution(workspacePath, executionNumber, configPath);
    if (result) {
      const executionName = result.outputExecutionName;
      const executionPath = result.outputExecutionPath;
      return {
        executionNumber,
        executionName,
        executionPath
      };
    }
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { outputExecutionMiddleware };
