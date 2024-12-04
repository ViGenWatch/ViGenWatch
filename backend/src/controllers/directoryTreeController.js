const DirectoryTree = require("../entity/directory-tree");
const storage = require("../utils/storage");
const CustomError = require("../entity/customError");
const workspace = require("../utils/workspace");
const executionService = require("../services/executionService");

const getDirectoryTree = async (req, res) => {
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
        console.log("dshfkhfkaskf");
        child.name = match.executionName;
      }
    });
    return res.status(200).json({ data: directoryObject, message: "getDirectory Successfull" });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getDirectoryTree;
