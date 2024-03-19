const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },

  totalPrice: { type: Number, required: true },
  attributes: { type: String },
  status: { type: String, enum: ["active", "removed"], default: "active" },
});

const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
