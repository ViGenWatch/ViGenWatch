'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reference.init({
    folderName: DataTypes.STRING,
    referencePath: DataTypes.STRING,
    referenceName: DataTypes.STRING,
    definiton: DataTypes.STRING,
    author: DataTypes.STRING,
    version: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reference',
  });
  return Reference;
};