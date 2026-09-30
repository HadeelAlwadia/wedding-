const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const providerRoutes = require("./routes/providerRoutes");
const businessRoutes = require("./routes/businessRoutes");

dotenv.config();
const app = express();


// Database
connectDB(); 

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use(
  "/api/provider",
  providerRoutes
);
app.use(
  "/api/businesses",
  businessRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});