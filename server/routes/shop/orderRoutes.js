const { Router } = require("express");
const router = Router();

const {
  createOrder,
  capturePayment,
} = require("../../controllers/shop/orderController");

router.post("/create", createOrder);
router.post("/capture", capturePayment);

module.exports = router;
