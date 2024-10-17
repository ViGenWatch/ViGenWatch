const DirectoryTree = require("../utils/directory-tree");
const storage = require("../utils/storage");
const CustomError = require("../utils/customError");

const getDirectoryTree = async (req, res) => {
  try {
    const directoryPath = storage.uploadPath();
    let directotyTree = new DirectoryTree(directoryPath, "upload");
    const result = await directotyTree.loadDirectoryTree();
    return res.status(200).json({ result: result, message: "getDirectory Successfull" });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getDirectoryTree;
