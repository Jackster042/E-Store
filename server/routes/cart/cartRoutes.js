const { Router } = require("express");
const router = Router();

const {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
} = require("../../controllers/shop/cartController");

router.post("/add", addToCart);

module.exports = router;
