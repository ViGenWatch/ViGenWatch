const process = require("process");
const executionService = require("../services/executionService");
const execution = require("../utils/execution");
const path = require("path");
const { exec } = require("child_process");
const sshConnection = require("../entity/sshConnect");
const fs = require("fs");
const augurVariable = require("../utils/augur");
const refernceFileService = require("../services/referenceFileService");
const sessionManager = require("../entity/sessionManager");
const fileService = require("../entity/fileService");
const workspace = require("../utils/workspace");

const uploadPath = (workspaceName) => {
  if (workspaceName) {
    return path.resolve(__dirname, `../../upload/${workspaceName}`);
  }
  return path.resolve(__dirname, "../../upload");
};

const uploadFileInput = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new Error("Please upload a file!", 400);
    }
    const { workspaceName, executionPath, userId, executionName, executionNumber, referenceId, referencePath } =
      req.body;
    const configPath = path.resolve(__dirname, referencePath);
    const uploadPath = path.resolve(__dirname, "../../upload");
    const result = await execution.createOutputExecution(executionPath, configPath);
    if (result) {
      exec(
        `chown -R ${process.env.UID}:${process.env.UID} ${uploadPath} && chmod -R 775 ${uploadPath}`,
        async (error, stdout, stderr) => {
          if (error) {
            throw new Error({ message: error.message }, 400);
          }
          if (stderr) {
            throw new Error({ message: error.message }, 400);
          }
          const newExecution = await executionService.createExecution({
            userId: userId,
            executionName: executionName,
            executionNumber: executionNumber,
            referenceId: referenceId,
            executionPath: executionPath
          });
          if (newExecution) {
            const referenceFile = await refernceFileService.getReferenceFileByReferenceId(referenceId);
            const referenceFileProperties = {
              auspiceConfig: referenceFile.auspiceConfig,
              colors: referenceFile.colors,
              droppedTrains: referenceFile.droppedTrains,
              includeTrains: referenceFile.includeTrains,
              latLongs: referenceFile.latLongs,
              virusOutgroup: referenceFile.virusOutgroup
            };
            const commandParams = Object.entries(referenceFileProperties)
              .filter(([key, value]) => value != null)
              .map(([key, value]) => {
                return `--${key}="${value}"`;
              })
              .join(" ");
            if (!sshConnection.isConnected) {
              await sshConnection.connect();
            }

            const result = await sshConnection.executeInline(
              `${augurVariable.augur_run} ${augurVariable.augur_data_path}${workspaceName}/${executionName} ${commandParams}`,
              augurVariable.augur_script_path
            );
            if (result) {
              return res.status(200).json({ message: "Create Execution Successfull" });
            }
          }
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

const uploadFilesInput = async (req, res, next) => {
  try {
    const sessionId = req.headers["session-id"];
    const fileIndex = parseInt(req.headers["file-index"]);
    const chunkIndex = parseInt(req.headers["chunk-index"]);
    const chunkSize = parseInt(req.headers["chunk-size"]);

    const session = sessionManager.getSession(sessionId);
    if (!session) {
      return res.status(400).send("Invalid session");
    }

    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));

    req.on("end", () => {
      try {
        const chunkData = Buffer.concat(chunks);
        const updated = session.updateChunk(fileIndex, chunkIndex, chunkData, chunkSize);

        if (!updated) {
          return res.status(400).send("Invalid file index");
        }

        if (session.isFileComplete(fileIndex, chunkSize)) {
          const file = session.getFile(fileIndex);
          const filePath = fileService.saveCompletedInputFile(
            file.name,
            file.buffer,
            file.size,
            file.folderName,
            file.userName
          );

          file.buffer = null;
          const executionPath = path.resolve(__dirname, `../../upload/${file.userName}_workspace/${file.folderName}`);
          exec(
            `chown -R ${process.env.UID}:${process.env.UID} ${executionPath} && chmod -R 775 ${executionPath}`,
            async (error, stdout, stderr) => {
              if (error) {
                throw new Error({ message: error.message }, 400);
              }
              if (stderr) {
                throw new Error({ message: error.message }, 400);
              }
              req.app.get("wss").clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(
                    JSON.stringify({
                      type: "FILE_COMPLETED",
                      fileIndex,
                      fileName: file.name
                    })
                  );
                }
              });
            }
          );
        }
        res.sendStatus(200);
      } catch (error) {
        throw new Error("Upload error:" + error, 400);
      }
    });
  } catch (error) {
    next(error);
  }
};

const uploadInforExecution = async (req, res, next) => {
  try {
    const { id, userName } = req.user;
    const { referenceId, referencePath, folderName } = req.body;
    const workspaceName = workspace.formatWorkspaceName(userName);
    const workspacePath = uploadPath(workspaceName);
    const executionNumber = await executionService.getNextExecutionNumber(id);
    const executionName = execution.formatExecutionName(executionNumber);
    const executionPath = path.join(workspacePath, folderName);
    const _uploadPath = uploadPath();
    const configPath = path.resolve(__dirname, referencePath);
    const result = await execution.createOutputExecution(executionPath, configPath);
    if (result) {
      exec(
        `chown -R ${process.env.UID}:${process.env.UID} ${_uploadPath} && chmod -R 775 ${_uploadPath}`,
        async (error, stdout, stderr) => {
          if (error) {
            throw new Error({ message: error.message }, 400);
          }
          if (stderr) {
            throw new Error({ message: error.message }, 400);
          }
          const newExecution = await executionService.createExecution({
            userId: id,
            executionName: executionName,
            executionNumber: executionNumber,
            referenceId: referenceId,
            executionPath: executionPath
          });
          if (newExecution) {
            return res.status(200).json({ message: "Create Execution Successfull" });
          }
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFileInput, uploadFilesInput, uploadInforExecution };
