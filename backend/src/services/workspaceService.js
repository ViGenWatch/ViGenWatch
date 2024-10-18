const db = require("../models/index");
const CustomError = require("../entity/customError");

const createWorkspace = async (workspace) => {
  try {
    const newWorkspace = await db.Workspace.create({
      workspaceName: workspace.workspaceName,
      userId: workspace.userId
    });
    return newWorkspace;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { createWorkspace };
