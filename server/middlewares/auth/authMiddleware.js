const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env.config");
const UserModel = require("../../models/UserModel");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    const freshUser = await UserModel.findById(req.user._id);

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = { authMiddleware };
