'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    static associate(models) {
      Feature.belongsToMany(models.Car, {
        through: 'CarFeature',
        foreignKey: 'featureId'
      });
    }
  }
  Feature.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Feature',
    timestamps: false
  });
  return Feature;
};