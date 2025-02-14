const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./index");

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env" }); // Default to development
}

// PORT
const PORT = process.env.PORT || 3001;

// MONGO_URI
const DB_URL = process.env.MONGO_DB;

// CONNECT TO MONGO
const startServer = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);

    const server = app.listen(PORT, () => {
      console.log(`Application is running on http://localhost:${PORT}`);
    });

    // HANDLE SERVER ERROR
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
      }
      console.error("Server error:", err);
    });

    // GRACEFUL SHUTDOWN
    process.on("SIGTERM", () => {
      console.log("SIGTERM signal received: closing HTTP server");
      server.close(async () => {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
        console.log("HTTP server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

startServer();
