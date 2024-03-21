const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  const {
    productName,
    category,
    description,
    price,
    image,
    quantity,
    featured,
  } = req.body;

  try {
    const newProduct = new Product({
      productName: productName,
      category: category,
      description: description,
      price: price,
      image: image,
      quantity: quantity,
      featured: featured,
    });

    await newProduct.save();
    res.json("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json("Error adding product");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json("Error fetching products");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
