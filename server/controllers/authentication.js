const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    console.log(req.body);
    if (!name || !email || !phoneNumber || !password) {
      return res.json("please fill the details");
    }
    const newUser = new User({ name, email, phoneNumber, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send("please fill the details");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("Email not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login };
