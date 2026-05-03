const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const rateLimit = require("express-rate-limit");
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// connect DB
connectDB();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limit each IP
  });
// routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/app", require("./routes/appRoutes"));
app.use(limiter);
app.use("/admin", require("./routes/adminRoutes"));
app.use("/dev", require("./routes/devRoutes"));
app.get("/", (req, res) => {
  res.send("Auth Service Running...");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));