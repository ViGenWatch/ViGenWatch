"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "Executions",
        "referenceId",
        {
          type: Sequelize.INTEGER,
          references: {
            model: "References",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
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
      await queryInterface.removeColumn("Executions", "referenceId", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      console.error("Migration down failed:", err);
      throw err;
    }
  }
};
