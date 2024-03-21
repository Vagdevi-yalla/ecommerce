const express = require("express");
const productController = require("../controllers/productController"); // Import product controller

const router = express.Router();

// Route for creating a new product
router.post("/", productController.createProduct);

// Route for retrieving all products
router.get("/", productController.getAllProducts);

module.exports = router;
