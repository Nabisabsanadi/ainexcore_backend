import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// ✅ Add new student
router.post("/add", async (req, res) => {
  const { name, course, semester, email, phone } = req.body;
  try {
    const student = new Student({ name, course, semester, email, phone });
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update student by ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, course, semester, email, phone } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, course, semester, email, phone },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete student by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get total course count
router.get("/count", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting course count:", error);
    res.status(500).json({ message: "Error getting course count", error });
  }
});

export default router;
