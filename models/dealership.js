'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dealership extends Model {
    static associate(models) {
      Dealership.hasMany(models.Car, { foreignKey: 'dealershipId' });
      Dealership.belongsToMany(models.User, {
        through: 'UserDealership',
        foreignKey: 'dealershipId'
      });
    }
  }
  Dealership.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Dealership',
    paranoid: true,
    timestamps: false
  });
  return Dealership;
};