const DirectoryTree = require("../utils/directory-tree");
const path = require("path");
const CustomError = require("../utils/customError");

const getDirectoryTree = async (req, res) => {
  try {
    const directoryPath = path.resolve(__dirname, "../../upload/");
    let directotyTree = new DirectoryTree(directoryPath, "upload");
    const result = await directotyTree.loadDirectoryTree();
    return res.status(200).json({ result: result });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getDirectoryTree;
