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
    console.log(decoded, "decoded from middleware");
    req.user = decoded;

    console.log(req.user, "req.user from middleware");

    const freshUser = await UserModel.findById(req.user._id);
    console.log(freshUser, "freshUser from middleware");

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = { authMiddleware };
