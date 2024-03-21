const Cart = require("../models/cartModel");

// Controller for adding an item to the cart
const addItemToCart = async (req, res) => {
  const {
    userId,
    productId,
    productName,
    description,
    image,
    quantity,
    price,
  } = req.body;

  try {
    // Check if the user has an existing cart
    let cart = await Cart.findOne({ userId });

    // If the user does not have a cart, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
    }

    // Add the new item to the cart
    const newItem = {
      productId,
      productName,
      description,
      image,
      quantity,
      price,
    };
    cart.items.push(newItem);

    // Update total price and total quantity
    cart.totalPrice += price * quantity;
    cart.totalQuantity += quantity;

    // Save the updated cart
    await cart.save();

    res.status(201).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
};

module.exports = {
  addItemToCart,
};
