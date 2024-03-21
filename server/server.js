const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(PORT, () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to database!");
      console.log(`Server running on port ${PORT}`);
    })
    .catch((error) => {
      console.error("Connection failed!", error);
    });
});
