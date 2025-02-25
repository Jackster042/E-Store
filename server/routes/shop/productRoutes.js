const { Router } = require("express");
const router = Router();

const {
  getFilteredProducts,
} = require("../../controllers/shop/shopController");

router.get("/get", getFilteredProducts);

module.exports = router;
