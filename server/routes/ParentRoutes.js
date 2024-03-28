const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const cartController = require("../controller/cartController");
const productController = require("../controller/productController");

// USERS
router.route("/_REGISTER").post(authController.register);
router.route("/_LOGIN").post(authController.login);
router.route("/_USERS").get(userController.getAllUsers);

// CART

// Add Items to the cart and increase the quantity of the item
router
  .route("/_USERS/:userId/_ADDPRODUCT/:productId")
  .post(cartController.addItemToCart)
  .delete(cartController.removeItemFromCart);

router.route("/_CARTS").get(cartController.getCarts);

router.route("/_CARTS/:cartId").get(cartController.getUserItemsFromCart);

// PRODUCTS
router
  .route("/_PRODUCTS")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/_PRODUCTS/:id")
  .get(authController.protect, productController.getProductById)
  .delete(authController.protect, productController.deleteProduct)
  .patch(authController.protect, productController.updateProduct);

router.route("/price_lowest").get(productController.getLowestPriceProduct);

router.route("/sortAscending").get(productController.getAscending);

module.exports = router;
