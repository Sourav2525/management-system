/* eslint-disable snakecasejs/snakecasejs */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("role-permission", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uuid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "role",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      permissions_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "permission",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: "deleted_at",
        allowNull: true,
      },
    });

    // Add index on frequently queried columns if needed
    await queryInterface.addIndex("role-permission", ["role_id"]);
    await queryInterface.addIndex("role-permission", ["permissions_id"]);
  },

  async down (queryInterface) {
    await queryInterface.dropTable("role-permission");
  }
};
