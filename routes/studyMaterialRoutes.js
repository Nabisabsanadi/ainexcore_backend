import express from "express";
import StudyMaterial from "../models/studyMaterialModel.js";
// import Course from "../models/courseModel.js";
import Course from "../models/courseModel.js";
const router = express.Router();

// Add new study material
router.post("/add", async (req, res) => {
  try {
    const { course, title, pdfUrl, imageUrl, videoLink } = req.body;

    if (!course || !title) {
      return res.status(400).json({ message: "Course and title are required" });
    }

    const material = new StudyMaterial({ course, title, pdfUrl, imageUrl, videoLink });
    await material.save();

    res.status(201).json({ message: "Study material added successfully", material });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get materials by course
router.get("/:courseId", async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ course: req.params.courseId }).populate("course", "name");
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials", error });
  }
});

export default router;
