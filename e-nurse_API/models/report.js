'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
  
    static associate(models) {
      Report.belongsTo(models.User, {foreignKey: "userId"})
      Report.hasMany(models.Interaction, {
        foreignKey: 'reportId'
      })
      Report.hasMany(models.Consulting, {foreignKey: "reportId"})
      
    }
  }
  Report.init({
    userId: DataTypes.INTEGER,
    drugs: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Report',
    paranoid: true,
    tableName: 'Reports'
  });
  return Report;
};
