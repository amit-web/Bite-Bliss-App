const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to a user
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to a restaurant item
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
