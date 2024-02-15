/* eslint-disable snakecasejs/snakecasejs */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');  // Create extension

    await queryInterface.createTable("role", {
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
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      display_picture: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
  },

  async down (queryInterface) {
    await queryInterface.dropTable("role");
  }
};
