'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Interaction.belongsTo(models.Report, {foreignKey: "reportId"})
    }
  }
  Interaction.init({
    reportId: DataTypes.INTEGER,
    severity: DataTypes.STRING,
    comment: DataTypes.TEXT,
    description: DataTypes.TEXT,
    source: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Interaction',
    paranoid: true,
    tableName: 'Interactions'
  });
  return Interaction;
};