import OpenAI from "openai";
import QuizzSchema from "../models/QuizzSchema.js";

// this is a fourth commit

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateQuizz = async (req, res) => {
  try {
    const { topic, numQuestions = 5, difficulty = "medium" } = req.body;

    const prompt = `Generate a quizz on the topic "${topic}" with ${numQuestions} ${difficulty} questions. Each question should have 4 options and indicate the correct answer. Format the response as JSON with the following structure:
        {
          "topic": "topic",
          "questions": [    
            {   
              "question": "Question text",
              "options": ["A: ...", "B: ...", "C: ...", "D: ..."],
                "answer": "A",
                "explanation": "Explanation text"
            }
          ]
        }
        Ensure factual accuracy and return as a valid JSON only.`;

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });
    // console.log(response);
    // console.log(response.choices[0].message);
    const Questions = JSON.parse(
      response.choices[0].message.content.replace(/^```json\s*|[\s`]*```$/g, "")
    );
    // console.log(Questions);
    const newQuizz = new QuizzSchema({ topic, questions: Questions.questions });
    await newQuizz.save();
    res.status(200).json({ quizId: newQuizz._id, Questions });
  } catch (error) {
    console.error("AI Gen Error:", error);
    res.status(500).json({
      message: "Quiz generation failed—check your API key!",
      error: error.message,
    });
  }
};
