const { mkdir } = require("fs/promises");
const path = require("path");
const CustomError = require("../entity/customError");

const formatWorkspaceName = (username) => {
  return `${username}_workspace`;
};

const uploadPath = () => {
  return path.resolve(__dirname, "../../upload/");
};

const createWorkspace = async (username) => {
  try {
    const directoryPath = uploadPath();
    const workspaceName = formatWorkspaceName(username);
    const workspacePath = path.join(directoryPath, workspaceName);
    await mkdir(workspacePath, { recursive: true });
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { createWorkspace, formatWorkspaceName };
