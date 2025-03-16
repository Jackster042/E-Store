const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ROUTES
const authRoutes = require("./routes/auth/auth-routes");
const adminRoutes = require("./routes/admin/productRoutes");
const adminOrderRoutes = require("./routes/admin/orderRoutes");

const cartRoutes = require("./routes/cart/cartRoutes");
const shopRoutes = require("./routes/shop/productRoutes");
const orderRoutes = require("./routes/shop/orderRoutes");
const addressRoutes = require("./routes/address/addressRoutes");

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control  ",
      "Expires",
      "Pragma",
    ],
    // maxAge: 86400,
    // optionsSuccessStatus: 204,
    // exposedHeaders: ["Set-Cookie"],
    // maxAge: 86400,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ROUTES
// TODO: ADD ROUTES HERE
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/shop/products", shopRoutes);
app.use("/api/shop/cart", cartRoutes);
app.use("/api/shop/address", addressRoutes);
app.use("/api/shop/order", orderRoutes);

// 404 HANDLER
app.use("*", (req, res, next) => {
  return next(new Error(`Page ${req.originalUrl} not found`, 404));
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
