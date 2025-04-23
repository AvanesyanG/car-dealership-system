'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CarFeatures', {
      carId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Cars',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      featureId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Features',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CarFeatures');
  }
};