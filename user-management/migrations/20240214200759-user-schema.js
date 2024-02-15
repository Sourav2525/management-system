/* eslint-disable snakecasejs/snakecasejs */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
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
        }
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "department",
          key: "id"
        }
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      profile_pic: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "active"
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
        }
      },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
        }
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
      extra_role_permission: {
        type: Sequelize.JSONB,
        allowNull: true,
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable("user");
  }
};
