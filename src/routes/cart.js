const Cart = require("../models/Cart");
const Item = require("../models/Item");

const addToCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, cartItems: [] });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const existingItem = cart.cartItems.find((i) => i.itemId.equals(itemId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cartItems.push({
        itemId: item._id,
        itemName: item.itemName,
        price: item.price,
        quantity
      });
    }

    cart.cartTotal = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
