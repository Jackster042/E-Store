const { Router } = require("express");
const router = Router();

const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/shopController");

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;
