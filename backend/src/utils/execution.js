const { mkdir } = require("fs/promises");
const fs = require("fs");
const path = require("path");
const CustomError = require("../entity/customError");
const glob = require("glob-promise");

const formatWorkspaceName = (executionNumber) => {
  return `execution_${executionNumber}`;
};

const createOutputExecution = async (executionPath, configPath) => {
  try {
    const configExecutionPath = path.join(executionPath, "config");
    await mkdir(configExecutionPath, { recursive: true });
    const files = await new Promise((resolve, reject) => {
      fs.readdir(configPath, (err, files) => {
        if (err) {
          return reject(new CustomError(err.message, 400));
        }
        resolve(files);
      });
    });

    await Promise.all(
      files.map((file) => {
        const sourcePath = path.join(configPath, file);
        const targetPath = path.join(configExecutionPath, file);
        return new Promise((resolve, reject) => {
          fs.copyFile(sourcePath, targetPath, (err) => {
            if (err) {
              return reject(new CustomError(err.message, 400));
            }
            console.log(`Symlink created successfully for ${file}`);
            resolve();
          });
        });
      })
    );
    return true;
  } catch (error) {
    console.error(error);
    throw new CustomError(error.message, 400);
  }
};

const getAuspiceOutputJson = async (executionPath, res) => {
  const auspicePath = path.join(executionPath, "auspice");
  const pattern = path.join(auspicePath, "**");
  const files = await glob(pattern, { cwd: auspicePath, nodir: true });
  const virusName = path.basename(files[0]);
  const dataPath = path.resolve(__dirname, `${auspicePath}/${virusName}`);
  console.log(dataPath);
  const readStream = fs.createReadStream(dataPath);
  readStream.on("open", () => {
    res.set("Content-Type", "application/json");
    readStream.pipe(res);
  });
  readStream.on("error", (err) => {
    throw new CustomError({ message: err.message }, 404);
  });
};

module.exports = { formatWorkspaceName, createOutputExecution, getAuspiceOutputJson };
