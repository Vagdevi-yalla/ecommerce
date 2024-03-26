const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Routes
const authRoute = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");

// Mounting routes
app.use("/", authRoute);
app.use("/products", productRouter);
app.use("/cart", cartRoute);

// Health check route
app.get("/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.status(200).json({
    server: "server live",
    db: dbStatus,
  });
});

// Default route
app.get("/", (req, res) => res.send("Hello World!"));

module.exports = app;
