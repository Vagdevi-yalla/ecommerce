const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);
module.exports = user;
