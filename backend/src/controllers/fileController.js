const CustomError = require("../entity/customError");
const process = require("process");
const executionService = require("../services/executionService");
const execution = require("../utils/execution");
const path = require("path");
const { exec } = require("child_process");
const sshConnection = require("../entity/sshConnect");
const fs = require("fs");
const augurVariable = require("../utils/augur");

const uploadFileInput = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new CustomError("Please upload a file!", 400);
    }
    const { workspaceName, executionPath, userId, executionName, executionNumber, referenceId, referencePath } =
      req.body;
    console.log(req.body);
    const configPath = path.resolve(__dirname, referencePath);
    const uploadPath = path.resolve(__dirname, "../../upload");
    const result = await execution.createOutputExecution(executionPath, configPath);
    if (result) {
      exec(
        `chown -R ${process.env.UID}:${process.env.UID} ${uploadPath} && chmod -R 775 ${uploadPath}`,
        async (error, stdout, stderr) => {
          if (error) {
            throw new CustomError({ message: error.message }, 400);
          }
          if (stderr) {
            throw new CustomError({ message: error.message }, 400);
          }
          const newExecution = await executionService.createExecution({
            userId: userId,
            executionName: executionName,
            executionNumber: executionNumber,
            referenceId: referenceId,
            executionPath: executionPath
          });
          if (newExecution) {
            if (!sshConnection.isConnected) {
              await sshConnection.connect();
            }
            const result = await sshConnection.executeInline(
              `${augurVariable.augur_run} ${augurVariable.augur_data_path}${workspaceName}/${executionName}`,
              augurVariable.augur_script_path
            );
            if (result) {
              await execution.getAuspiceOutputJson(executionPath, res);
            }
            console.log("successfull");
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = uploadFileInput;
