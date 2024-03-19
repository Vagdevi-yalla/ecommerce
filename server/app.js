const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState == 1 ? "connected" : "disconnected";
  res.status(200).json({
    server: "server live",
    db: dbStatus,
  });
});

module.exports = app;
