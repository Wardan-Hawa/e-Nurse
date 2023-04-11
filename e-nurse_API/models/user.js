'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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