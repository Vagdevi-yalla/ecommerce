// const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    console.log(req.body);
    if (!name || !email || !phoneNumber || !password) {
      return res.json("Please fill all the details");
    }
    const newUser = new User({ name, email, phoneNumber, password });
    await newUser.save();
    res.json("User registered successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send("Please fill all the details");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json("Email not found");
    }
    // Here you should add logic to check if the password matches
    // with the password stored in the database for the user.
    // Example:
    // const isPasswordValid = await user.comparePassword(password);
    // if (!isPasswordValid) {
    //   return res.json("Invalid password");
    // }
    // If the password is valid, you can proceed with login.
    // For now, let's assume login is successful without password verification.
    res.json("Login successful");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login };
