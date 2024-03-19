const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String, // Changed type to String for phone number
  },
  password: {
    type: String,
    required: true,
  },
});

// Define and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
