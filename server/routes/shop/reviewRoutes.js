const { Router } = require("express");

const router = Router();

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/reviewController");

router.post("/add", addProductReview);
router.get("/:productId", getProductReviews);

module.exports = router;
