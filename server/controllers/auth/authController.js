const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../../models/UserModel");
const { JWT_SECRET, JWT_OPTIONS } = require("../../config/env.config.js");
const SALT = 12;
// TODO: THIS WILL MOST LIKELY BE TRANSFERRED IN USER MODEL

//  REGISTER USER
exports.register = async (req, res, next) => {
  //   console.log(req.body, "req.body REGISTER");
  const { email, password, userName } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user, "user");

    if (user)
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, SALT);

      const newUser = new UserModel({
        email,
        password: hashedPassword,
        userName,
      });

      const savedUSer = await newUser.save();

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: savedUSer,
      });
    } else {
      console.log("User with this email already exists");
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
  } catch (error) {
    console.error(error, "error from REGISTER BACKEND");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//  LOGIN USER
exports.login = async (req, res, next) => {
  //   console.log(req.body, "req.body LOGIN");
  //   const { email, password } = req.body;
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email: req.body.email }).select(
      "+password"
    );
    // console.log(user, "user from LOGIN");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Don't have an account? Register" });

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("Is valid", isCorrectPassword);
    if (!isCorrectPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const payload = {
      _id: user._id,
      role: user.role,
      email: user.email,
    };

    // console.log(payload, "payload");

    const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
    // console.log(token, "token");

    const { userName, password, __v, ...userData } = user._doc;
    // console.log(userData, "userData");

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: userData.email,
          role: userData.role,
          id: userData._id,
        },
        token,
      });

    // console.log(userData, "userData");

    // return res.status(200).json({
    //   status: "success",
    //   message: "Logged in successfully",
    //   user: userData,
    //   token,
    // });
  } catch (error) {
    console.error(error, "error from LOGIN BACKEND");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//  LOGOUT USER

exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
