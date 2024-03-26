const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
  },
  images: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  productCategory: {
    type: String,
  },
  company: {
    type: String,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
