const { Router } = require("express");
const router = Router();

// CONTROLLERS
const authController = require("../../controllers/auth/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
