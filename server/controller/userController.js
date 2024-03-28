const catchAsync = require("../utils/catchAsync");
const User = require("../models/UserModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    message: "Users Found",
    data: {
      users,
    },
  });
});
