import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    duration: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
