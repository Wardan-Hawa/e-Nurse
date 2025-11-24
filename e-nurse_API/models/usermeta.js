'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMeta extends Model {
    static associate(models) {
      UserMeta.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  UserMeta.init({
    userId: DataTypes.INTEGER,
    metaKey: DataTypes.STRING,
    metaValue: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UserMeta',
  });
  return UserMeta;
};
