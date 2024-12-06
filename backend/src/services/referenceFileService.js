const db = require("../models/index");
const { where } = require("sequelize");

const createReferenceFile = async (data) => {
  try {
    const referenceFile = await db.ReferenceFile.create({
      auspiceConfig: data.auspiceConfig,
      colors: data.colors,
      droppedTrains: data.droppedTrains,
      includeTrains: data.includeTrains,
      latLongs: data.latLongs,
      virusOutgroup: data.virusOutgroup,
      referenceId: data.referenceId
    });
    return referenceFile;
  } catch (error) {
    throw new Error(error.message, 400);
  }
};

const getReferenceFileByReferenceId = async (referenceId) => {
  try {
    const referenceFile = await db.ReferenceFile.findOne({
      where: {
        referenceId
      }
    });
    return referenceFile;
  } catch (error) {
    throw new Error(error.message, 400);
  }
};

module.exports = { createReferenceFile, getReferenceFileByReferenceId };
