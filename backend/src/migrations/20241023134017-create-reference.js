'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('References', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      folderName: {
        type: Sequelize.STRING
      },
      referencePath: {
        type: Sequelize.STRING
      },
      referenceName: {
        type: Sequelize.STRING
      },
      definition: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('References');
  }
};