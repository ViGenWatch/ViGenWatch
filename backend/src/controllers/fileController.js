const CustomError = require("../entity/customError");
const process = require("process");
const executionService = require("../services/executionService");
const execution = require("../utils/execution");
const path = require("path");
const uploadFileInput = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new CustomError("Please upload a file!", 400);
    }
    const { executionPath, userId, executionName, executionNumber } = req.body;
    const configPath = path.resolve(__dirname, "../../upload/config/zika_config");
    const result = await execution.createOutputExecution(executionPath, configPath);
    if (result) {
      const newExecution = await executionService.createExecution({
        userId: userId,
        executionName: executionName,
        executionNumber: executionNumber
      });
      if (newExecution) {
        console.log("successfull");
        res.status(200).json({ message: "File uploaded successfully!" });
      }
    }
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = uploadFileInput;
