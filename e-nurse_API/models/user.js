'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsToMany(models.Speciality, {
        through: "userSpeciality",
        foreignKey: "userId"
      })
      User.hasMany(models.Report, {foreignKey: "userId"})
      User.hasMany(models.Message, {foreignKey: "userId"})
      User.hasMany(models.UserMeta, {foreignKey: 'userId'})
      User.hasMany(models.Consulting, {foreignKey: 'userId'})

    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    approvedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
    tableName: `Users`,
    paranoid: true,
  });
  return User;
};
