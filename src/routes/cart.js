const express = require("express");
const router = express.Router();
const Cart = require("../models/cart"); // Mongoose Model

// Get Cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Item to Cart
router.post("/add", async (req, res) => {
  const { userId, itemId, itemName, price, quantity } = req.body;

  try {
    // Check if the cart exists for the user
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if the item already exists in the cart
      const itemIndex = cart.items.findIndex((i) => i.itemId === itemId);

      if (itemIndex > -1) {
        // If item exists, update its quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Else, add the new item to the cart
        cart.items.push({ itemId, itemName, price, quantity });
      }

      // Update the total price of the cart
      cart.total += price * quantity;
    } else {
      // If cart doesn't exist, create a new cart
      cart = new Cart({
        userId,
        items: [{ itemId, itemName, price, quantity }],
        total: price * quantity,
      });
    }

    // Save the updated cart
    await cart.save();

    res.status(201).json({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Remove Item from Cart
router.delete("/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    const itemIndex = cart.items.findIndex((i) => i.id === itemId);

    if (itemIndex > -1) {
      const removedItem = cart.items[itemIndex];
      cart.total -= removedItem.price * removedItem.quantity;

      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
