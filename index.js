import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import courseRoutes from "./routes/courseRoutes.js";
import studyMaterialRoutes from "./routes/studyMaterialRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup (add your deployed Netlify domain)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "https://ainexcore-academy.netlify.app", // 👈 your live frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/study-materials", studyMaterialRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);

app.get("/", (req, res) => {
  res.send("EduAdmin Backend Running Successfully 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
