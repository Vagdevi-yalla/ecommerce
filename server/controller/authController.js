const catchAsync = require("../utils/catchAsync");
const userModel = require("../models/UserModel");
const cartModel = require("../models/CartModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Function to sign a JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.WEBSECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

// Registration handler
exports.register = catchAsync(async (req, res, next) => {
  const newUser = await userModel.create(req.body);
  const newUserCart = await cartModel.create({ user: newUser._id, items: [] });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "User is Registered",
    token,
    userId: newUser._id,
    cartId: newUserCart._id,
  });
});

// Login handler
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Email or Password is not provided",
    });
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  const token = signToken(user._id);
  const cartId = await cartModel.findOne({ user: user._id });

  res.status(200).json({
    status: "success",
    token,
    data: {
      userName: user.name,
      userId: user._id,
      cartId: cartId._id,
    },
  });
});

// Authentication middleware
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Not logged in",
      error: "Token not found",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.WEBSECRET);
  const freshUser = await userModel.findById(decoded.id);

  if (!freshUser) {
    return res.status(401).json({
      status: "fail",
      message: "User does not exist",
    });
  }

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      status: "fail",
      message: "Password has been changed recently, please log in again",
    });
  }

  req.user = freshUser;
  next();
});
