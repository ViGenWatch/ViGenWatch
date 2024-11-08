const { mkdir } = require("fs/promises");
const fs = require("fs");
const path = require("path");
const CustomError = require("../entity/customError");
const glob = require("glob-promise");
const mime = require("mime-types");

const formatWorkspaceName = (executionNumber) => {
  return `execution_${executionNumber}`;
};

const createOutputExecution = async (executionPath, configPath) => {
  try {
    const configExecutionPath = path.join(executionPath, "config");
    await mkdir(configExecutionPath, { recursive: true });

    const files = await fs.promises.readdir(configPath);

    await Promise.all(
      files.map(async (file) => {
        const sourcePath = path.join(configPath, file);
        const targetPath = path.join(configExecutionPath, file);
        try {
          await fs.promises.copyFile(sourcePath, targetPath);
          console.log(`Symlink created successfully for ${file}`);
        } catch (err) {
          throw new CustomError(err.message, 400);
        }
      })
    );

    return true;
  } catch (error) {
    console.error(error);
    throw new CustomError(error.message, 400);
  }
};

const getAuspiceOutputJson = async (executionPath, res) => {
  try {
    const auspicePath = path.join(executionPath, "auspice");
    const pattern = path.join(auspicePath, "**");
    const files = await glob(pattern, { cwd: auspicePath, nodir: true });
    if (files.length === 0) {
      throw new CustomError("No Auspice output found", 404);
    }
    const virusName = path.basename(files[0]);
    const dataPath = path.resolve(__dirname, `${auspicePath}/${virusName}`);
    res.setHeader("Content-Type", "application/json");
    fs.createReadStream(dataPath).pipe(res);
  } catch (err) {
    throw new CustomError(err.message, err.status || 500);
  }
};

const getContentFile = async (filePath, res) => {
  try {
    const _uploadPath = path.resolve(__dirname, "../../upload/");
    const fullFilePath = path.join(_uploadPath, filePath);

    if (!fs.existsSync(fullFilePath)) {
      res.status(404).send("File not found");
      return;
    }

    res.setHeader("Content-Type", "text/plain");
    const fileStream = fs.createReadStream(fullFilePath);
    fileStream.pipe(res);

    fileStream.on("error", (err) => {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
    });

    fileStream.on("end", () => {
      res.end();
    });
  } catch (err) {
    console.error("Error getting content file:", err);
    res.status(500).send("Error getting content file");
  }
};

const onDownloadFile = async (filePath, res) => {
  try {
    const _uploadPath = path.resolve(__dirname, "../../upload/");
    const fullFilePath = path.join(_uploadPath, filePath);

    if (!fs.existsSync(fullFilePath)) {
      return res.status(404).send({ message: "File not found" });
    }

    const stats = await fs.promises.stat(fullFilePath);
    const fileName = path.basename(fullFilePath);
    const mimeType = mime.lookup(fullFilePath) || "application/octet-stream";

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Length", stats.size);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    const fileStream = fs.createReadStream(fullFilePath);

    fileStream.on("error", (error) => {
      console.error("Error reading file:", error);
      return res.status(500).send({ message: "Error reading file" });
    });

    fileStream.pipe(res);

    fileStream.on("end", () => {
      res.end();
    });

    res.on("close", () => {
      fileStream.destroy();
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { formatWorkspaceName, createOutputExecution, getAuspiceOutputJson, getContentFile, onDownloadFile };
