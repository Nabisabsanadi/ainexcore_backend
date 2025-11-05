import express from "express";
import Course from "../models/courseModel.js";
import StudyMaterial from "../models/studyMaterialModel.js";

const router = express.Router();

// Add new course
router.post("/add", async (req, res) => {
  try {
    const { name, category, description, duration } = req.body;

    if (!name || !category) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newCourse = new Course({
      name,
      category,
      description,
      duration,
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Get total course count
router.get("/count", async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting course count:", error);
    res.status(500).json({ message: "Error getting course count", error });
  }
});

// Update a course
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course", error });
  }
});

// Delete a course
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Error deleting course", error });
  }
});

// Search courses by name
router.get("/show", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search
    }

    const courses = await Course.find(query);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Get Single Course Details + Study Materials
router.get("/:id/details", async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const studyMaterials = await StudyMaterial.find({ course: id });

    res.status(200).json({
      course,
      studyMaterials,
    });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ message: "Error fetching course details", error });
  }
});


export default router;
