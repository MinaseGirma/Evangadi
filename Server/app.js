const express = require("express");
const cors = require("cors");
const app = express();

// ✅ Use Render's assigned port OR 5000 locally
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());

// ✅ CORS configuration — removed trailing slash!
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://evangadiforummg.netlify.app"
    ],
    credentials: true,
  })
);

// ✅ Database connection
const dbconnection = require("./Database/databaseconfig");

// ✅ User routes
const userRoutes = require("./routes/userroutes");
app.use("/api/user", userRoutes);

// ✅ Question routes
const questionRoutes = require("./routes/questionRoute");
app.use("/api/question", questionRoutes);

// ✅ Answer routes
const answerRoutes = require("./routes/answerRoute");
app.use("/api/answer", answerRoutes);

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// ✅ Start server (Render-compatible)
async function start() {
  try {
    await dbconnection;
    console.log("✅ Connected to MySQL2 database!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
  }
}

start();
