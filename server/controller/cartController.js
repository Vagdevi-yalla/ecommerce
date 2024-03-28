const catchAsync = require("../utils/catchAsync");
const Cart = require("../models/CartModel");

exports.getCarts = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();

  return res.status(200).json({
    status: "Success",
    length: carts.length,
    carts,
  });
});

exports.addItemToCart = catchAsync(async (req, res, next) => {
  const { userId, productId } = req.params;
  const { quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  let existingItem = cart.items.find((item) => item.product.equals(productId));

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();

  return res.status(201).json({
    status: "Success",
    cart,
  });
});

exports.getUserItemsFromCart = catchAsync(async (req, res, next) => {
  const { cartId } = req.params;
  const UserCart = await Cart.findById(cartId);

  return res.status(200).json({
    status: "Success",
    UserCart,
  });
});

exports.removeItemFromCart = catchAsync(async (req, res, next) => {
  const { userId, productId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({
      status: "Error",
      message: "Cart not found",
    });
  }

  const itemIndex = cart.items.findIndex((item) =>
    item.product.equals(productId)
  );

  if (itemIndex !== -1) {
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    return res.status(200).json({
      status: "Success",
      message: "Item removed from cart",
      cart,
    });
  } else {
    return res.status(404).json({
      status: "Error",
      message: "Item not found in cart",
    });
  }
});
