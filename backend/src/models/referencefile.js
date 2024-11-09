'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReferenceFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReferenceFile.init({
    auspiceConfig: DataTypes.STRING,
    colors: DataTypes.STRING,
    droppedTrains: DataTypes.STRING,
    latLongs: DataTypes.STRING,
    virusOutgroup: DataTypes.STRING,
    referenceId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'ReferenceFile',
  });
  return ReferenceFile;
};