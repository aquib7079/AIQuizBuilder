import express from "express";
import { generateQuizz } from "../controllers/OpenAI.js";

const router = express.Router();

router.post("/generate-quiz", generateQuizz);

export default router;
