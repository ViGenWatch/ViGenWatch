const DirectoryTree = require("../entity/directory-tree");
const storage = require("../utils/storage");
const workspace = require("../utils/workspace");
const executionService = require("../services/executionService");

const getDirectoryTree = async (req, res, next) => {
  try {
    const user = req.user;
    const { userName, id } = user;
    const workspaceName = workspace.formatWorkspaceName(userName);
    const directoryPath = storage.uploadPath(workspaceName);
    let directotyTree = new DirectoryTree(directoryPath, workspaceName);
    const executionPathList = await executionService.getListExecutionPath(id);
    const directoryObject = await directotyTree.loadDirectoryTree();

    directoryObject.children.forEach((child) => {
      const match = executionPathList.find((item) => {
        return item.executionPath.split("/").pop() === child.path.split("/").pop();
      });

      if (match) {
        child.name = match.executionName;
      }
    });
    return res.status(200).json({ data: directoryObject, message: "getDirectory Successfull" });
  } catch (error) {
    next(error);
  }
};

module.exports = getDirectoryTree;
