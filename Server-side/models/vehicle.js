'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.User)
      Vehicle.belongsTo(models.Type)
    }
  }
  Vehicle.init({
    vin: DataTypes.STRING,
    brand: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    model: DataTypes.STRING,
    transMission: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    yearRelease: DataTypes.INTEGER,
    milleage: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER,
    features: DataTypes.TEXT,
    currentLocation: DataTypes.STRING,
    condition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};