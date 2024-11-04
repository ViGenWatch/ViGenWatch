"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "Executions",
        "executionPath",
        {
          type: Sequelize.STRING,
          allowNull: false
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      console.error("Migration up failed:", err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("Executions", "executionPath", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      console.error("Migration down failed:", err);
      throw err;
    }
  }
};
