const db = require("../models/index");
const CustomError = require("../entity/customError");
const { where } = require("sequelize");

const getListReferences = async () => {
  try {
    const references = await db.Reference.findAll({
      attributes: ["id", "referencePath", "referenceName", "definition", "author", "version"],
      where: {
        status: true
      }
    });
    return references;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

const createReference = async (data) => {
  try {
    const reference = await db.Reference.create({
      folderName: data.folderName,
      referencePath: data.referencePath,
      referenceName: data.referenceName,
      definition: data.definition,
      author: data.author,
      version: data.version,
      userId: data.userId,
      link: data.link,
      status: data.status,
      require: data.require
    });

    return reference;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { getListReferences, createReference };
