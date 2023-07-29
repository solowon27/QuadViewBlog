const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogs extends Model {}

Blogs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Link to database
    timestamps: false, // Don't add timestamps
    freezeTableName: true, // Don't pluralize name of database table
    underscored: true, // Use underscores instead of camel-casing
    modelName: 'blogs', // Set name of database table
  }
);

module.exports = Blogs;
