const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") }); // Load env vars from root

const app = express();
const PORT = process.env.PORT || 5000;

// CORS – only allow the configured frontend origin
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:8080";
app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json({ limit: "50mb" })); // Increased limit for audio data

// General API rate limiter (100 req / 15 min per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests, please try again later." },
});

// Stricter rate limiter for AI routes that call paid external APIs (30 req / 15 min per IP)
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "AI rate limit exceeded, please wait before sending more requests." },
});

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/speechflow");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");

// Routes
app.use("/api/auth", apiLimiter, authRoutes);
app.use("/api/ai", aiLimiter, aiRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
