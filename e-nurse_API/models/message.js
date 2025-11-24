'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
  
    static associate(models) {
      Message.belongsTo(models.User, {foreignKey: "userId"})
      Message.belongsTo(models.Consulting, {foreignKey: "consultingId"})
    }
  }
  Message.init({
    consultingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    viewedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Message',
    paranoid: true,
    tableName: 'Messages'
  });
  return Message;
};
