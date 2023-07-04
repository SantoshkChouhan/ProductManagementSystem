// controllers/productController.js

const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    const products = await Product.findAll({
      offset,
      limit: pageSize,
      include: [{ model: Category }],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { productName, categoryId } = req.body;
    const product = await Product.create({ productName, categoryId });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, { include: [{ model: Category }] });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, categoryId } = req.body;
    const product = await Product.findByPk(id);
    product.productName = productName;
    product.categoryId = categoryId;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
