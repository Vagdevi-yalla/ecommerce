const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  imageUrl: { type: String },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
