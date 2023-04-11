'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMeta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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