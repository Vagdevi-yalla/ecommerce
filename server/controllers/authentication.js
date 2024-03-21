const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // Check if any required fields are missing
    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();

    // Return the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    // Handle any errors
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if any required fields are missing
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Passwords match, user is authenticated
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    // Handle any errors
    console.error("Login failed:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { register, login };
