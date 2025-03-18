const { Router } = require("express");
const { searchProducts } = require("../../controllers/shop/searchController");

const router = Router();

router.get("/:keyword", searchProducts);

module.exports = router;
