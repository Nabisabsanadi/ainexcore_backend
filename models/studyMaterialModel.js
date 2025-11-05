import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: { type: String, required: true },
    pdfUrl: { type: String },
    imageUrl: { type: String },
    videoLink: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("StudyMaterial", studyMaterialSchema);
