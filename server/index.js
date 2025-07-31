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
const searchRoutes = require("./routes/shop/searchRoutes");
const reviewRoutes = require("./routes/shop/reviewRoutes");

const featureRoutes = require("./routes/common/featureRoutes");

// MIDDLEWARES
app.use(
    cors({
        origin: function (origin, callback) {
            const allowedOrigins = [
                "https://e-store-client.onrender.com",
                "http://localhost:5173"
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Added OPTIONS
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept"
        ],
        exposedHeaders: ["Authorization"]
    })
);

// Handle preflight requests
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/shop/products", shopRoutes);
app.use("/api/shop/cart", cartRoutes);
app.use("/api/shop/address", addressRoutes);
app.use("/api/shop/order", orderRoutes);
app.use("/api/shop/search", searchRoutes);
app.use("/api/shop/review", reviewRoutes);

app.use("/api/common/feature", featureRoutes);

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
