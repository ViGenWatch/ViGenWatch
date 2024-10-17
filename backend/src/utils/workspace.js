const { mkdir } = require("fs/promises");
const storage = require("../utils/storage");
const path = require("path");
const CustomError = require("./customError");

const formatWorkspaceName = (username) => {
  return `${username}_workspace`;
};
const createWorkspace = async (username) => {
  try {
    const directoryPath = storage.uploadPath();
    const workspaceName = formatWorkspaceName(username);
    const workspacePath = path.join(directoryPath, workspaceName);
    await mkdir(workspacePath, { recursive: true });
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = createWorkspace;
