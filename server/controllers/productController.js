const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  const {
    name,
    images,
    rating,
    productCategory,
    company,
    description,
    color,
    availability,
    featured,
    price,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      images,
      rating,
      productCategory,
      company,
      description,
      color,
      availability,
      featured,
      price,
    });

    await newProduct.save();
    res.json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Error adding product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Error fetching products" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
