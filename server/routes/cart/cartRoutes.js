const { Router } = require("express");
const router = Router();

const {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
} = require("../../controllers/shop/cartController");

router.get("/get/:userId", getCart);
router.post("/add", addToCart);
router.put("/update-cart", updateQuantity);
router.delete("/:userId/:productId", removeFromCart);

module.exports = router;
