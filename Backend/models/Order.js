const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  cardNumber: String,
  expiryDate: String,
  cvc: String,
  cart: [
    {
      title: String,
      description: String,
      color: String,
      size: String,
      price: String,
      quantity: Number
    }
  ],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
