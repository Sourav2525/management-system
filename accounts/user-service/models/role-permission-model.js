/* eslint-disable snakecasejs/snakecasejs */
const { sequelize } = require("../config").db_connection;
const { DataTypes } = require("sequelize");

const role_permission_model = sequelize.define(
    "role-permission",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        uuid: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        permissions_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        paranoid: true, // Mark data as deleted instead of removing it once and for all from the database. It will generate deleted_at field.
        timestamps: true, // Auto-generated Timestamps
        underscored: true,
        tableName: "permission",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

module.exports = role_permission_model;
