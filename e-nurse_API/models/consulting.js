'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consulting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consulting.hasMany(models.Message, {foreignKey: "consultingId"})
      Consulting.belongsTo(models.User, {foreignKey: "userId"})
      Consulting.belongsTo(models.Report, {foreignKey: "reportId"})
    }
  }
  Consulting.init({
    reportId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Consulting',
    paranoid: true,
    tableName: 'Consultings'
  });
  return Consulting;
};