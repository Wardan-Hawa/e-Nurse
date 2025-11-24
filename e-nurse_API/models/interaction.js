'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
  
    static associate(models) {
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
