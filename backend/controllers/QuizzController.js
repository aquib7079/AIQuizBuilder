import QuizzSchema from "../models/QuizzSchema.js";

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizzSchema.findById(req.params.id);
    if (!quizzes) {
      return res.status(404).json({ message: "Quizz not found" });
    }
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export { getQuizzes };
