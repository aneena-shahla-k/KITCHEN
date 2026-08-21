const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts
};