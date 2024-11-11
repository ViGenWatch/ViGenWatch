"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reference.hasOne(models.ReferenceFile, {
        foreignKey: "referenceId",
        as: "referenceFile"
      });
    }
  }
  Reference.init(
    {
      folderName: DataTypes.STRING,
      referencePath: DataTypes.STRING,
      referenceName: DataTypes.STRING,
      definition: DataTypes.STRING,
      author: DataTypes.STRING,
      version: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      link: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      require: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Reference"
    }
  );
  return Reference;
};
