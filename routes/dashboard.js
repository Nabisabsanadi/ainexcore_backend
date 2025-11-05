import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// Dashboard Overview Route
router.get("/overview", auth, async (req, res) => {
  try {
    // Sample static data, you can replace with DB queries later
    const data = {
      totalCourses: 12,
      activeCourses: 8,
      totalRevenue: 2400,
      studentsEnrolled: 128
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
