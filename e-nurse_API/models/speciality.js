'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Speciality.belongsToMany(models.User, {
        through: "userSpeciality",
        foreignKey: "specialityId"
      })
    }
  }
  Speciality.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Speciality',
    paranoid: true,
    tableName: 'Specialities'
  });
  return Speciality;
};