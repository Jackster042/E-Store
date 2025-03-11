const { Router } = require("express");
const router = Router();

const { createOrder } = require("../../controllers/shop/orderController");

router.post("/create", createOrder);

module.exports = router;
