const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g. "best-picks", "trending", "mens", "womens"
  image: { type: String, required: true }, // image URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
