const { Router } = require("express");
const router = Router();

// CONTROLLERS
const productController = require("../../controllers/products/productController");

// MIDDLEWARES
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");

router.get("/products", authMiddleware, productController.getAllProducts);

module.exports = router;
