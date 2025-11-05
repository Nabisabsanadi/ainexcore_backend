import express from "express";
import Teacher from "../models/Teacher.js";

const router = express.Router();

// Add new teacher
router.post("/add", async (req, res) => {
  const { name, email, subject, course } = req.body;
  try {
    const teacher = new Teacher({ name, email, subject, course });
    await teacher.save();
    res.status(201).json({ message: "Teacher added successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update teacher
router.put("/update/:id", async (req, res) => {
  const { name, email, subject, course } = req.body;
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, email, subject, course },
      { new: true }
    );
    res.json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete teacher
router.delete("/delete/:id", async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get total teacher count
router.get("/count", async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.status(200).json({ count });
  }
    catch (error) {
    console.error("Error getting teacher count:", error);
    res.status(500).json({ message: "Error getting teacher count", error });
  }
});
export default router;
