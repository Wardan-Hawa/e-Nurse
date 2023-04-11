'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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