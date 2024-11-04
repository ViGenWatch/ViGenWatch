const db = require("../models/index");
const CustomError = require("../entity/customError");

const getListReferences = async () => {
  try {
    const references = await db.Reference.findAll({
      attributes: ["id", "referencePath", "referenceName", "definition", "author", "version"]
    });
    return references;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

module.exports = { getListReferences };
