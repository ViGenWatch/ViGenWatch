const db = require("../models/index");
const CustomError = require("../entity/customError");
const { where, Op } = require("sequelize");

const getListReferences = async (userId) => {
  try {
    const references = await db.Reference.findAll({
      attributes: [
        "id",
        "referencePath",
        "referenceName",
        "definition",
        "author",
        "version",
        "status",
        "userId",
        "require"
      ],
      where: {
        [Op.or]: [{ status: 1 }, { userId: userId }]
      },
      include: [
        {
          model: db.ReferenceFile,
          as: "referenceFile",
          attributes: ["auspiceConfig", "colors", "droppedTrains", "includeTrains", "latLongs", "virusOutgroup"],
          required: false
        }
      ]
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

const getReferenceById = async (referenceId) => {
  try {
    const reference = await db.Reference.findOne({
      where: {
        id: referenceId
      }
    });

    return reference;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const updateReferenceById = async (referenceId, data) => {
  try {
    const newReference = db.Reference.update(data, {
      where: { id: referenceId }
    });
    return newReference;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { getListReferences, createReference, getReferenceById, updateReferenceById };
