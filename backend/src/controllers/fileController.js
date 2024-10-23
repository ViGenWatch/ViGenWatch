const CustomError = require("../entity/customError");
const process = require("process");
const executionService = require("../services/executionService");
const execution = require("../utils/execution");
const path = require("path");
const { exec } = require("child_process");
const sshConnection = require("../entity/sshConnect");
const fs = require("fs");

const uploadFileInput = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new CustomError("Please upload a file!", 400);
    }
    const { executionPath, userId, executionName, executionNumber } = req.body;
    const configPath = path.resolve(__dirname, "../../upload/config/zika_config");
    const uploadPath = path.resolve(__dirname, "../../upload");
    console.log(configPath);
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
            executionNumber: executionNumber
          });
          if (newExecution) {
            if (!sshConnection.isConnected) {
              await sshConnection.connect();
            }
            const result = await sshConnection.executeInline(
              "./run_pipeline.sh ../augur_data/khaitd01_workspace/execution_4",
              "/augur/augur_script/"
            );
            if (result) {
              const dataPath = path.resolve(__dirname, "../../upload/khaitd01_workspace/execution_4/auspice/zika.json");
              const readStream = fs.createReadStream(dataPath);
              readStream.on("open", () => {
                res.set("Content-Type", "application/json");
                readStream.pipe(res);
              });
              readStream.on("error", (err) => {
                throw new CustomError({ message: err.message }, 404);
              });
            }
            console.log("successfull");
          }
        }
      );
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
