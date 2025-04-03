const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",  // Ensure this matches the "User" model name exactly
    required: true
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: "books",  // Ensure this matches the "Book" model name exactly
    required: true
  },
  status: {
    type: String,
    default: "Order Placed",
    enum: ["Order Placed", "Out for Delivery", "Delivered", "Canceled"]
  }
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);  // "Order" matches the capitalized name

module.exports = Order;