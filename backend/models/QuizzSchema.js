import mongoose from "mongoose";

const QuizzSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      answer: { type: String, required: true },
      explanation: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quizz", QuizzSchema);
