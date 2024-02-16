/* eslint-disable snakecasejs/snakecasejs */
const { sequelize } = require("../config").db_connection;
const { DataTypes } = require("sequelize");

const role_model = sequelize.define(
  "role",
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    display_picture: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true, // Mark data as deleted instead of removing it once and for all from the database. It will generate deleted_at field.
    timestamps: true, // Auto-generated Timestamps
    underscored: true,
    tableName: "role",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

role_model.associate = function(models) {
  role_model.hasMany(models.user, { foreignKey: "role_id", sourceKey: "id", as: "user" });
  role_model.hasMany(models["role-permission"], { foreignKey: "role_id", sourceKey: "id", as: "role_permission" });
};

module.exports = role_model;
