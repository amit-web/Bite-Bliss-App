const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Link to a user (if using user authentication)
  cartItems: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant.items", required: true },
      itemName: { type: String, required: true }, // Store item name for convenience
      price: { type: Number, required: true }, // Store price to handle price changes
      quantity: { type: Number, required: true, default: 1 },
      restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" } // Optional, to track the source restaurant
    },
  ],
  cartTotal: { type: Number, default: 0 }, // Total cost of the cart
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
