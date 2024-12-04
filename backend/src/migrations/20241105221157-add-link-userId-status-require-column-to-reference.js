"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "References",
        "userId",
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "References",
        "link",
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "References",
        "status",
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "References",
        "require",
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
      await queryInterface.removeColumn("References", "userId", { transaction });
      await queryInterface.removeColumn("References", "link", { transaction });
      await queryInterface.removeColumn("References", "status", { transaction });
      await queryInterface.removeColumn("References", "require", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      console.error("Migration down failed:", err);
      throw err;
    }
  }
};
