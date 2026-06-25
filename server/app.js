require("dotenv").config();
const express = require("express");
const app = express();
const { connectDb } = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./models");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogsRoutes");
const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const blogTagRoutes = require("./routes/blogTagRoutes");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Techzuno Backend is running....");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs/categories", blogCategoryRoutes);
app.use("/api/blogs/tags", blogTagRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
module.exports = app;
