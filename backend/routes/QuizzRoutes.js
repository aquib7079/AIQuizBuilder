import express from "express";
import { getQuizzes } from "../controllers/QuizzController.js";

// quizz routes

const router = express.Router();

router.get("/quiz/:id", getQuizzes);

export default router;
