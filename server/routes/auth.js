const express = require("express");
const { register, login } = require("../controllers/authentication");

const authRoute = express.Router();

authRoute.route("/register").post(register);
authRoute.route("/login").post(login);

module.exports = authRoute;
