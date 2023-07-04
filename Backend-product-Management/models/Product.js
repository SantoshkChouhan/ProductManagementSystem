// models/Product.js

const { DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Category = require('./Category');

const Product = db.define('Product', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
