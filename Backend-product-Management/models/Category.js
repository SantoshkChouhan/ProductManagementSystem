// models/Category.js

const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Category = db.define('Category', {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
