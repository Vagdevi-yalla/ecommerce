const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  billingInfo: { type: Object },
});

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;
