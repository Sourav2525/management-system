/* eslint-disable snakecasejs/snakecasejs */
const { sequelize } = require("../config").db_connection;
const { DataTypes } = require("sequelize");

const user_model = sequelize.define(
    "user",
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
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        profile_pic: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "active"
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        extra_role_permission: {
            type: DataTypes.JSONB,
            allowNull: true,
        }
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

user_model.associate = function (models) {
    user_model.hasOne(models.role, { foreignKey: "role_id", as: "role" });
    user_model.hasOne(models.department, { foreignKey: "department_id", as: "department" });
};

module.exports = user_model;
