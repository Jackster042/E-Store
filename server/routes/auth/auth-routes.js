const { Router } = require("express");
const router = Router();

// CONTROLLERS
const authController = require("../../controllers/auth/authController");

// MIDDLEWARES
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "Authenticated user!", user });
});

module.exports = router;
