const db = require("../models/index");
const { where, Op } = require("sequelize");
const Sequelize = require("sequelize");

const deleteReferenceManually = async (referenceId) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.ReferenceFile.destroy({
      where: { referenceId },
      transaction
    });

    await db.Reference.destroy({
      where: { id: referenceId },
      transaction
    });

    await transaction.commit();
    return;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error.message, 500);
  }
};

//role user 0x01
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
          association: "referenceFile",
          attributes: ["auspiceConfig", "virusOutgroup", "colors", "droppedTrains", "includeTrains", "latLongs"],
          required: false
        },
        {
          association: "user",
          attributes: ["role"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });
    return references;
  } catch (error) {
    throw new Error(error.message, 500);
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
    throw new Error(error.message, 400);
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
    throw new Error(error.message, 400);
  }
};

const updateReferenceById = async (referenceId, data) => {
  try {
    const newReference = db.Reference.update(data, {
      where: { id: referenceId }
    });
    return newReference;
  } catch (error) {
    throw new Error(error.message, 400);
  }
};

//role user 0x02
const getListReferencesRoleAuthority = async () => {
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
        [Op.or]: [
          { "$user.role$": "0x02" },
          {
            [Op.and]: [
              { "$user.role$": "0x01" },
              {
                [Op.or]: [{ status: 1 }, { require: 1, status: 0 }]
              }
            ]
          }
        ]
      },
      include: [
        {
          association: "referenceFile",
          attributes: ["auspiceConfig", "virusOutgroup", "colors", "droppedTrains", "includeTrains", "latLongs"],
          required: false
        },
        {
          association: "user",
          attributes: ["role"]
        }
      ],
      order: [
        [Sequelize.literal("(CASE WHEN `require` = 1 AND `status` = 0 THEN 0 ELSE 1 END)")],
        ["createdAt", "DESC"]
      ]
    });
    return references;
  } catch (error) {
    throw new Error(error.message, 500);
  }
};

module.exports = {
  getListReferences,
  createReference,
  getReferenceById,
  updateReferenceById,
  getListReferencesRoleAuthority,
  deleteReferenceManually
};
