'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      Car.belongsTo(models.Dealership, { foreignKey: 'dealershipId' });
      Car.hasMany(models.Rating, { foreignKey: 'carId' });
      Car.belongsToMany(models.Feature, {
        through: 'CarFeature',
        foreignKey: 'carId'
      });
    }
  }
  Car.init({
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dealershipId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Car',
    timestamps: false
  });
  return Car;
};