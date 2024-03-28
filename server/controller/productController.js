const catchAsync = require("./../utils/catchAsync");
const Product = require("../models/ProductModel");

exports.getLowestPriceProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find({}).sort({ price: 1 });

  return res.status(200).json({
    status: "success",
    message: "Retrieved all products sorted by lowest price",
    data: {
      products,
    },
  });
});

exports.getAscending = catchAsync(async (req, res, next) => {
  const products = await Product.find({}).sort({ productName: 1 });

  return res.status(200).json({
    status: "success",
    message: "Retrieved all products sorted by product name in ascending order",
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: {
      product: newProduct,
    },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const queryObj = {};

  if (req.query.color) {
    queryObj.color = req.query.color;
  }

  if (req.query.brand) {
    queryObj.brand = req.query.brand;
  }

  if (req.query.productType) {
    queryObj.productType = req.query.productType;
  }

  if (req.query.price) {
    queryObj.price = req.query.price;
  }

  if (req.query.search) {
    queryObj.productName = { $regex: new RegExp(req.query.search, "i") };
  }

  const products = await Product.find(queryObj);

  return res.status(200).json({
    status: "success",
    message: "Retrieved products based on query parameters",
    data: {
      products,
    },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Retrieved product by ID",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  return res.status(204).json({
    status: "success",
    message: "Product deleted successfully",
    data: null,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProduct) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: {
      product: updatedProduct,
    },
  });
});
